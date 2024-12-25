import ProductForServiceExchangeModel from "@/models/student/ProductForServiceExchange/ProductForServiceExchangeModel";
import { getUserIdFromToken } from "@/utils/auth";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import dotenv from "dotenv";
dotenv.config();

// Connect to database
await dbConnect();
// Helper function to handle array-like keys
const collectFilesFromFormData = (
  formData: FormData,
  prefix: string,
  singleFileKey = false
): File[] | File | null => {
  if (singleFileKey) {
    for (const [key, value] of formData.entries()) {
      if (key === prefix && value instanceof File) {
        return value; // Return the single File object
      }
    }
    return null; // Return null if no matching File is found
  } else {
    const collectedFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith(prefix) && value instanceof File) {
        collectedFiles.push(value);
      }
    }
    return collectedFiles;
  }
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    // Initialize default structures
    const defaultSubmitExchangeDetails = {
      title: "",
      offerType: "",
      category: "",
      subcategory: "",
      featuredProductStatus: "",
      additionalDescription: "",
      zoneOneBanner: null as string | null, // Stores Cloudinary URL
      images: [] as (string | File)[],
      startDate: "",
      endDate: "",
      materialConditions: {
        estimatedValue: "",
        depositPayment: { decision: "", percentage: "" },
        otherContingentCoverageRequired: "",
      },
      guarantees: {
        moneyBackGuarantee: "",
        satisfactionGuarantee: "",
      },
      paymentDetails: {
        desiredPaymentForm: "",
        desiredPaymentType: "",
      },
      deliveryConditions: {
        pickup: {
          allowed: "",
          details: { address: "", country: "", city: "", campus: "" },
        },
        delivery: {
          allowed: "",
          costOption: "",
          details: { amount: "", country: "", city: "" },
        },
      },
      geolocation: { campus: "", country: "" },
      otherSpecialConditions: {
        additionalDescription: "",
        uploadedFiles: [] as (string | File)[],
      },
    };

    const defaultExpectedRequirementsDetails = {
      title: "",
      offerType: "",
      category: "",
      subcategory: "",
      featuredProductStatus: "",
      additionalDescription: "",
      zoneOneBanner: null as string | null, // Stores Cloudinary URL
      images: [] as (string | File)[],
      startDate: "",
      endDate: "",
      materialConditions: {
        hourlyRate: 0,
        minimumBenefit: 0,
        packageRequested: 0,
        travelExpenses: { isRequired: "", feeAmount: 0 },
        freeQuote: { freeQuote: "", feeAmount: 0 },
        otherPossibleCost: {
          otherPossibleCost: "",
          amountOfCost: 0,
          natureOfTheseCost: "",
        },
        contingentWarranty: "",
        guarantees: {
          moneyBackGuarantee: "",
          satisfactionGuarantee: "",
        },
        estimatedValue: "",
        depositPayment: { decision: "", percentage: "" },
        otherContingentCoverageRequired: "",
        paymentDetails: {
          desiredPaymentForm: "",
          desiredPaymentType: "",
        },
      },
      deliveryConditions: {
        pickup: {
          allowed: "",
          details: { address: "", country: "", city: "", campus: "" },
        },
        delivery: {
          allowed: "",
          costOption: "",
          details: { amount: "", country: "", city: "" },
        },
      },
      geolocation: { campus: "", country: "" },
      otherSpecialConditions: {
        additionalDescription: "",
        uploadedFiles: [] as (string | File)[],
      },
    };

    // Helper function to assign nested keys
    const assignNestedKey = (obj: any, path: string[], value: any) => {
      let current = obj;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
    };

    // Parse formData into respective objects
    const submitExchangeDetails = { ...defaultSubmitExchangeDetails };
    const expectedRequirementsDetails = {
      ...defaultExpectedRequirementsDetails,
    };

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("submitExchangeDetails.")) {
        const path = key.replace("submitExchangeDetails.", "").split(".");
        assignNestedKey(
          submitExchangeDetails,
          path,
          value instanceof File ? value : value
        );
      } else if (key.startsWith("expectedRequirementDetails.")) {
        const path = key.replace("expectedRequirementDetails.", "").split(".");
        assignNestedKey(
          expectedRequirementsDetails,
          path,
          value instanceof File ? value : value
        );
      }
    }

    // Process zoneOneBanner for submitExchangeDetails
    const submitZoneOneBanner = collectFilesFromFormData(
      formData,
      "submitExchangeDetails.zoneOneBanner",
      true
    );
    if (submitZoneOneBanner) {
      submitExchangeDetails.zoneOneBanner = await uploadToCloudinary(
        submitZoneOneBanner as File,
        "banners"
      );
    }

    // Process images for submitExchangeDetails
    const submitImages = collectFilesFromFormData(
      formData,
      "submitExchangeDetails.images"
    ) as File[];
    if (submitImages.length > 0) {
      const uploadedImages = await Promise.all(
        submitImages.map((file) => uploadToCloudinary(file, "images"))
      );
      submitExchangeDetails.images = uploadedImages.filter((url) => !!url); // Filter out invalid URLs
    } else {
      submitExchangeDetails.images = []; // Ensure images is an empty array if no files are processed
    }

    // Process uploadedFiles for submitExchangeDetails
    const submitUploadedFiles = collectFilesFromFormData(
      formData,
      "submitExchangeDetails.otherSpecialConditions.uploadedFiles"
    ) as File[];
    if (submitUploadedFiles.length > 0) {
      const uploadedFiles = await Promise.all(
        submitUploadedFiles.map((file) => uploadToCloudinary(file, "files"))
      );
      submitExchangeDetails.otherSpecialConditions.uploadedFiles =
        uploadedFiles.filter((url) => !!url); // Filter out invalid URLs
    } else {
      submitExchangeDetails.otherSpecialConditions.uploadedFiles = []; // Ensure uploadedFiles is an empty array if no files are processed
    }

    // Process zoneOneBanner for expectedRequirementsDetails
    const expectedZoneOneBanner = collectFilesFromFormData(
      formData,
      "expectedRequirementDetails.zoneOneBanner",
      true
    );
    if (expectedZoneOneBanner) {
      expectedRequirementsDetails.zoneOneBanner = await uploadToCloudinary(
        expectedZoneOneBanner as File,
        "banners"
      );
    }

    // Process images for expectedRequirementsDetails
    const expectedImages = collectFilesFromFormData(
      formData,
      "expectedRequirementDetails.images"
    ) as File[];
    if (expectedImages.length > 0) {
      const uploadedImages = await Promise.all(
        expectedImages.map((file) => uploadToCloudinary(file, "images"))
      );
      expectedRequirementsDetails.images = uploadedImages.filter(
        (url) => !!url
      ); // Filter out invalid URLs
    } else {
      expectedRequirementsDetails.images = []; // Ensure images is an empty array if no files are processed
    }

    // Process uploadedFiles for expectedRequirementsDetails
    const expectedUploadedFiles = collectFilesFromFormData(
      formData,
      "expectedRequirementDetails.otherSpecialConditions.uploadedFiles"
    ) as File[];
    if (expectedUploadedFiles.length > 0) {
      const uploadedFiles = await Promise.all(
        expectedUploadedFiles.map((file) => uploadToCloudinary(file, "files"))
      );
      expectedRequirementsDetails.otherSpecialConditions.uploadedFiles =
        uploadedFiles.filter((url) => !!url); // Filter out invalid URLs
    } else {
      expectedRequirementsDetails.otherSpecialConditions.uploadedFiles = []; // Ensure uploadedFiles is an empty array if no files are processed
    }

    console.log("Final Parsed submitExchangeDetails:", submitExchangeDetails);
    console.log(
      "Final Parsed expectedRequirementsDetails:",
      expectedRequirementsDetails
    );

    // Extract user ID
    const createdBy = getUserIdFromToken(request);

    // Save to MongoDB
    const newExchange = new ProductForServiceExchangeModel({
      submitExchangeDetails,
      expectedRequirements: expectedRequirementsDetails,
      status: "pending",
      createdBy,
    });

    // Save to MongoDB
    const savedExchange = await newExchange.save();

    return new Response(
      JSON.stringify({
        message: "Data saved successfully",
        data: savedExchange,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
// // Create a new ProductForProductExchange document
//     const newExchange = new ProductForServiceExchangeModel({
//       submitExchangeDetails: parsedData.submitExchangeDetails,
//       expectedRequirements: parsedData.expectedRequirementsDetails,
//       status: "pending",
//       createdBy: createdBy, // Replace with actual user ID from authentication
//     });

//     // Save to MongoDB
//     const savedExchange = await newExchange.save();

//     return NextResponse.json({
//       message: "Data saved successfully",
//       data: savedExchange,
//     });
//   } catch (error) {
//     console.error("Error processing POST request:", error);
//     return NextResponse.json(
//       { error: "Failed to process the request" },
//       { status: 500 }
//     );
//   }

//full code

// import ProductForServiceExchangeModel from "@/models/student/ProductForServiceExchange/ProductForServiceExchangeModel";
// import { getUserIdFromToken } from "@/utils/auth";
// import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
// import { NextRequest, NextResponse } from "next/server";

// // Helper function to handle array-like keys
// const collectFilesFromFormData = (
//   formData: FormData,
//   prefix: string,
//   singleFileKey = false
// ): File[] | File | null => {
//   if (singleFileKey) {
//     for (const [key, value] of formData.entries()) {
//       if (key === prefix && value instanceof File) {
//         return value; // Return the single File object
//       }
//     }
//     return null; // Return null if no matching File is found
//   } else {
//     const collectedFiles: File[] = [];
//     for (const [key, value] of formData.entries()) {
//       if (key.startsWith(prefix) && value instanceof File) {
//         collectedFiles.push(value);
//       }
//     }
//     return collectedFiles;
//   }
// };

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();

//     // Debug raw FormData
//     console.log("Raw FormData entries:");
//     for (const [key, value] of formData.entries()) {
//       if (value instanceof File) {
//         console.log(`${key}: File - Name: ${value.name}, Size: ${value.size}`);
//       } else {
//         console.log(`${key}: ${value}`);
//       }
//     }

//     // Initialize default structures
//     const defaultSubmitExchangeDetails = {
//       title: "",
//       offerType: "",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "",
//       additionalDescription: "",
//       zoneOneBanner: null as string | null, // Stores Cloudinary URL
//       images: [] as (string | File)[],
//       startDate: "",
//       endDate: "",
//       materialConditions: {
//         estimatedValue: "",
//         depositPayment: { decision: "", percentage: "" },
//         otherContingentCoverageRequired: "",
//       },
//       guarantees: {
//         moneyBackGuarantee: "",
//         satisfactionGuarantee: "",
//       },
//       paymentDetails: {
//         desiredPaymentForm: "",
//         desiredPaymentType: "",
//       },
//       deliveryConditions: {
//         pickup: {
//           allowed: "",
//           details: { address: "", country: "", city: "", campus: "" },
//         },
//         delivery: {
//           allowed: "",
//           costOption: "",
//           details: { amount: "", country: "", city: "" },
//         },
//       },
//       geolocation: { campus: "", country: "" },
//       otherSpecialConditions: {
//         additionalDescription: "",
//         uploadedFiles: [] as (string | File)[],
//       },
//     };

//     const defaultExpectedRequirementsDetails = {
//       title: "",
//       offerType: "",
//       category: "",
//       subcategory: "",
//       featuredProductStatus: "",
//       additionalDescription: "",
//       zoneOneBanner: null as string | null, // Stores Cloudinary URL
//       images: [] as (string | File)[],
//       startDate: "",
//       endDate: "",
//       materialConditions: {
//         hourlyRate: 0,
//         minimumBenefit: 0,
//         packageRequested: 0,
//         travelExpenses: { isRequired: "", feeAmount: 0 },
//         freeQuote: { freeQuote: "", feeAmount: 0 },
//         otherPossibleCost: {
//           otherPossibleCost: "",
//           amountOfCost: 0,
//           natureOfTheseCost: "",
//         },
//         contingentWarranty: "",
//         guarantees: {
//           moneyBackGuarantee: "",
//           satisfactionGuarantee: "",
//         },
//         estimatedValue: "",
//         depositPayment: { decision: "", percentage: "" },
//         otherContingentCoverageRequired: "",
//         paymentDetails: {
//           desiredPaymentForm: "",
//           desiredPaymentType: "",
//         },
//       },
//       deliveryConditions: {
//         pickup: {
//           allowed: "",
//           details: { address: "", country: "", city: "", campus: "" },
//         },
//         delivery: {
//           allowed: "",
//           costOption: "",
//           details: { amount: "", country: "", city: "" },
//         },
//       },
//       geolocation: { campus: "", country: "" },
//       otherSpecialConditions: {
//         additionalDescription: "",
//         uploadedFiles: [] as (string | File)[],
//       },
//     };

//     // Helper function to assign nested keys
//     const assignNestedKey = (obj: any, path: string[], value: any) => {
//       let current = obj;
//       for (let i = 0; i < path.length - 1; i++) {
//         if (!current[path[i]]) current[path[i]] = {};
//         current = current[path[i]];
//       }
//       current[path[path.length - 1]] = value;
//     };

//     // Parse formData into respective objects
//     const submitExchangeDetails = { ...defaultSubmitExchangeDetails };
//     const expectedRequirementsDetails = {
//       ...defaultExpectedRequirementsDetails,
//     };

//     for (const [key, value] of formData.entries()) {
//       if (key.startsWith("submitExchangeDetails.")) {
//         const path = key.replace("submitExchangeDetails.", "").split(".");
//         assignNestedKey(
//           submitExchangeDetails,
//           path,
//           value instanceof File ? value : value
//         );
//       } else if (key.startsWith("expectedRequirementDetails.")) {
//         const path = key.replace("expectedRequirementDetails.", "").split(".");
//         assignNestedKey(
//           expectedRequirementsDetails,
//           path,
//           value instanceof File ? value : value
//         );
//       }
//     }

//     // Process zoneOneBanner for submitExchangeDetails
//     const submitZoneOneBanner = collectFilesFromFormData(
//       formData,
//       "submitExchangeDetails.zoneOneBanner",
//       true
//     );
//     if (submitZoneOneBanner) {
//       submitExchangeDetails.zoneOneBanner = await uploadToCloudinary(
//         submitZoneOneBanner as File,
//         "banners"
//       );
//     }

//     // Process images for submitExchangeDetails
//     // const submitImages = collectFilesFromFormData(
//     //   formData,
//     //   "submitExchangeDetails.images"
//     // ) as File[];
//     // if (submitImages.length > 0) {
//     //   submitExchangeDetails.images = await Promise.all(
//     //     submitImages.map((file) => uploadToCloudinary(file, "images"))
//     //   );
//     // }

//     // Process uploadedFiles for submitExchangeDetails
//     // const submitUploadedFiles = collectFilesFromFormData(
//     //   formData,
//     //   "submitExchangeDetails.otherSpecialConditions.uploadedFiles"
//     // ) as File[];
//     // if (submitUploadedFiles.length > 0) {
//     //   submitExchangeDetails.otherSpecialConditions.uploadedFiles =
//     //     await Promise.all(
//     //       submitUploadedFiles.map((file) => uploadToCloudinary(file, "files"))
//     //     );
//     // }

//     // Process images for submitExchangeDetails
//     const submitImages = collectFilesFromFormData(
//       formData,
//       "submitExchangeDetails.images"
//     ) as File[];
//     if (submitImages.length > 0) {
//       const uploadedImages = await Promise.all(
//         submitImages.map((file) => uploadToCloudinary(file, "images"))
//       );
//       submitExchangeDetails.images = uploadedImages.filter((url) => !!url); // Filter out invalid URLs
//     } else {
//       submitExchangeDetails.images = []; // Ensure images is an empty array if no files are processed
//     }

//     // Process uploadedFiles for submitExchangeDetails
//     const submitUploadedFiles = collectFilesFromFormData(
//       formData,
//       "submitExchangeDetails.otherSpecialConditions.uploadedFiles"
//     ) as File[];
//     if (submitUploadedFiles.length > 0) {
//       const uploadedFiles = await Promise.all(
//         submitUploadedFiles.map((file) => uploadToCloudinary(file, "files"))
//       );
//       submitExchangeDetails.otherSpecialConditions.uploadedFiles =
//         uploadedFiles.filter((url) => !!url); // Filter out invalid URLs
//     } else {
//       submitExchangeDetails.otherSpecialConditions.uploadedFiles = []; // Ensure uploadedFiles is an empty array if no files are processed
//     }

//     // Process zoneOneBanner for expectedRequirementsDetails
//     const expectedZoneOneBanner = collectFilesFromFormData(
//       formData,
//       "expectedRequirementDetails.zoneOneBanner",
//       true
//     );
//     if (expectedZoneOneBanner) {
//       expectedRequirementsDetails.zoneOneBanner = await uploadToCloudinary(
//         expectedZoneOneBanner as File,
//         "banners"
//       );
//     }

//     // Process images for expectedRequirementsDetails
//     // const expectedImages = collectFilesFromFormData(
//     //   formData,
//     //   "expectedRequirementDetails.images"
//     // ) as File[];
//     // if (expectedImages.length > 0) {
//     //   expectedRequirementsDetails.images = await Promise.all(
//     //     expectedImages.map((file) => uploadToCloudinary(file, "images"))
//     //   );
//     // }
//     // Process images for expectedRequirementsDetails
//     const expectedImages = collectFilesFromFormData(
//       formData,
//       "expectedRequirementDetails.images"
//     ) as File[];
//     if (expectedImages.length > 0) {
//       const uploadedImages = await Promise.all(
//         expectedImages.map((file) => uploadToCloudinary(file, "images"))
//       );
//       expectedRequirementsDetails.images = uploadedImages.filter(
//         (url) => !!url
//       ); // Filter out invalid URLs
//     } else {
//       expectedRequirementsDetails.images = []; // Ensure images is an empty array if no files are processed
//     }

//     // Process uploadedFiles for expectedRequirementsDetails
//     const expectedUploadedFiles = collectFilesFromFormData(
//       formData,
//       "expectedRequirementDetails.otherSpecialConditions.uploadedFiles"
//     ) as File[];
//     if (expectedUploadedFiles.length > 0) {
//       const uploadedFiles = await Promise.all(
//         expectedUploadedFiles.map((file) => uploadToCloudinary(file, "files"))
//       );
//       expectedRequirementsDetails.otherSpecialConditions.uploadedFiles =
//         uploadedFiles.filter((url) => !!url); // Filter out invalid URLs
//     } else {
//       expectedRequirementsDetails.otherSpecialConditions.uploadedFiles = []; // Ensure uploadedFiles is an empty array if no files are processed
//     }

//     // Process uploadedFiles for expectedRequirementsDetails
//     // const expectedUploadedFiles = collectFilesFromFormData(
//     //   formData,
//     //   "expectedRequirementDetails.otherSpecialConditions.uploadedFiles"
//     // ) as File[];
//     // if (expectedUploadedFiles.length > 0) {
//     //   expectedRequirementsDetails.otherSpecialConditions.uploadedFiles =
//     //     await Promise.all(
//     //       expectedUploadedFiles.map((file) => uploadToCloudinary(file, "files"))
//     //     );
//     // }

//     //og
//     // if (
//     //   submitExchangeDetails.zoneOneBanner &&
//     //   typeof submitExchangeDetails.zoneOneBanner === "object" &&
//     //   "name" in submitExchangeDetails.zoneOneBanner &&
//     //   "size" in submitExchangeDetails.zoneOneBanner &&
//     //   "type" in submitExchangeDetails.zoneOneBanner
//     // ) {
//     //   submitExchangeDetails.zoneOneBanner = await uploadToCloudinary(
//     //     submitExchangeDetails.zoneOneBanner as File,
//     //     "banners"
//     //   );
//     // }

//     //og
//     // Collect image files from formData based on the structured keys like "submitExchangeDetails.images[0]"
//     // const imageFiles: File[] = [];
//     // for (const [key, value] of formData.entries()) {
//     //   if (
//     //     key.startsWith("submitExchangeDetails.images") &&
//     //     value instanceof File
//     //   ) {
//     //     imageFiles.push(value);
//     //   }
//     // }

//     //og
//     // Upload the collected image files to Cloudinary and store the resulting URLs
//     // if (imageFiles.length > 0) {
//     //   submitExchangeDetails.images = await Promise.all(
//     //     imageFiles.map((file) => uploadToCloudinary(file, "images"))
//     //   );
//     // }

//     //og
//     // Collect uploaded files from formData based on the structured keys like "submitExchangeDetails.otherSpecialConditions.uploadedFiles[0]"
//     // const uploadedFiles: File[] = [];
//     // for (const [key, value] of formData.entries()) {
//     //   if (
//     //     key.startsWith(
//     //       "submitExchangeDetails.otherSpecialConditions.uploadedFiles"
//     //     ) &&
//     //     value instanceof File
//     //   ) {
//     //     uploadedFiles.push(value);
//     //   }
//     // }

//     //og
//     // Upload the collected files to Cloudinary and store the resulting URLs
//     // if (uploadedFiles.length > 0) {
//     //   submitExchangeDetails.otherSpecialConditions.uploadedFiles =
//     //     await Promise.all(
//     //       uploadedFiles.map((file) => uploadToCloudinary(file, "files"))
//     //     );
//     // }

//     //og
//     //zoneOneBanner Of expectedRequirementDetails
//     // if (
//     //   expectedRequirementsDetails.zoneOneBanner &&
//     //   typeof expectedRequirementsDetails.zoneOneBanner === "object" &&
//     //   "name" in expectedRequirementsDetails.zoneOneBanner &&
//     //   "size" in expectedRequirementsDetails.zoneOneBanner &&
//     //   "type" in expectedRequirementsDetails.zoneOneBanner
//     // ) {
//     //   expectedRequirementsDetails.zoneOneBanner = await uploadToCloudinary(
//     //     expectedRequirementsDetails.zoneOneBanner as File,
//     //     "banners"
//     //   );
//     // }

//     //og
//     // Collect `images` from formData based on keys like "expectedRequirementDetails.images[0]"
//     // const expectedImages: File[] = [];
//     // for (const [key, value] of formData.entries()) {
//     //   if (
//     //     key.startsWith("expectedRequirementDetails.images") &&
//     //     value instanceof File
//     //   ) {
//     //     expectedImages.push(value);
//     //   }
//     // }

//     //og
//     // Upload the collected images to Cloudinary and store the resulting URLs
//     // if (expectedImages.length > 0) {
//     //   expectedRequirementsDetails.images = await Promise.all(
//     //     expectedImages.map((file) => uploadToCloudinary(file, "images"))
//     //   );
//     // }

//     //og
//     // Collect `uploadedFiles` from formData based on keys like "expectedRequirementDetails.otherSpecialConditions.uploadedFiles[0]"
//     // const expectedUploadedFiles: File[] = [];
//     // for (const [key, value] of formData.entries()) {
//     //   if (
//     //     key.startsWith(
//     //       "expectedRequirementDetails.otherSpecialConditions.uploadedFiles"
//     //     ) &&
//     //     value instanceof File
//     //   ) {
//     //     expectedUploadedFiles.push(value);
//     //   }
//     // }

//     //og
//     // Upload the collected files to Cloudinary and store the resulting URLs
//     // if (expectedUploadedFiles.length > 0) {
//     //   expectedRequirementsDetails.otherSpecialConditions.uploadedFiles =
//     //     await Promise.all(
//     //       expectedUploadedFiles.map((file) => uploadToCloudinary(file, "files"))
//     //     );
//     // }

//     console.log("Final Parsed submitExchangeDetails:", submitExchangeDetails);
//     console.log(
//       "Final Parsed expectedRequirementsDetails:",
//       expectedRequirementsDetails
//     );

//     const createdBy = getUserIdFromToken(request as NextRequest);

//     // Create a new ProductForProductExchange document
//         const newExchange = new ProductForServiceExchangeModel({
//           submitExchangeDetails: parsedData.submitExchangeDetails,
//           expectedRequirements: parsedData.expectedRequirementsDetails,
//           status: "pending",
//           createdBy: createdBy, // Replace with actual user ID from authentication
//         });

//         // Save to MongoDB
//         const savedExchange = await newExchange.save();

//         return NextResponse.json({
//           message: "Data saved successfully",
//           data: savedExchange,
//         });
//       } catch (error) {
//         console.error("Error processing POST request:", error);
//         return NextResponse.json(
//           { error: "Failed to process the request" },
//           { status: 500 }
//         );
//       }

//     // Return success response
//   //   return new Response(
//   //     JSON.stringify({
//   //       message: "Data parsed and structured successfully",
//   //       submitExchangeDetails,
//   //       expectedRequirementsDetails,
//   //     }),
//   //     { status: 200, headers: { "Content-Type": "application/json" } }
//   //   );
//   // } catch (error) {
//   //   console.error("Error processing POST request:", error);
//   //   return new Response(
//   //     JSON.stringify({ error: "Failed to process the request" }),
//   //     { status: 500, headers: { "Content-Type": "application/json" } }
//   //   );
//   // }
// }
