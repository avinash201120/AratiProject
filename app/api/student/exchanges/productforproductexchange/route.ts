import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

import ProductForProductExchange from "@/models/student/ProductForProductExchange/ProductForProductExchangeModel";
import dbConnect from "@/utils/dbConnect";
import { NextRequest } from "next/server";
import { getUserIdFromToken } from "@/utils/auth";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

// Connect to database
await dbConnect();
interface MaterialConditions {
  estimatedValue: string;
  decision: string;
  depositPayment: { percentage: string };
  otherContingentCoverageRequired: string;
}

interface Guarantees {
  moneyBackGuarantee: string;
  satisfactionGuarantee: string;
}

interface PaymentDetails {
  desiredPaymentForm: string;
  desiredPaymentType: string;
}

interface DeliveryDetails {
  allowed: string;
  details: {
    address: string;
    country: string;
    city: string;
    campus: string;
    cost?: string; // Optional for delivery
  };
}

interface DeliveryConditions {
  pickup: DeliveryDetails;
  delivery: DeliveryDetails;
}

interface Geolocation {
  campus: string;
  country: string;
}

interface OtherSpecialConditions {
  additionalDescription: string;
  uploadedFiles: string[];
}

interface SubmitExchangeDetails {
  title: string;
  offerType: string;
  category: string;
  subcategory: string;
  featuredProductStatus: string;
  additionalDescription: string;
  startDate: string;
  endDate: string;
  formOfExchange: string;
  materialConditions: MaterialConditions;
  guarantees: Guarantees;
  paymentDetails: PaymentDetails;
  deliveryConditions: DeliveryConditions;
  geolocation: Geolocation;
  zoneOneBanner?: string;
  images: string[];
  otherSpecialConditions: OtherSpecialConditions;
}

//this is for future exhancements
// interface ExpectedRequirementsDetails extends SubmitExchangeDetails {} // Similar structure as SubmitExchangeDetails

//Eslint problem comes so
type ExpectedRequirementsDetails = SubmitExchangeDetails;

interface ParsedData {
  submitExchangeDetails: SubmitExchangeDetails;
  expectedRequirementsDetails: ExpectedRequirementsDetails;
}

// Fetch all exchanges (GET)
export async function GET() {
  try {
    const exchanges = await ProductForProductExchange.find().populate(
      "createdBy"
    );
    return NextResponse.json(exchanges, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching exchanges", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse FormData
    const formData = await request.formData();

    console.log("formData", formData);

    // Prepare parsed data
    const parsedData: ParsedData = {
      submitExchangeDetails: JSON.parse(
        formData.get("submitExchangeDetails") as string
      ),
      expectedRequirementsDetails: JSON.parse(
        formData.get("expectedRequirementsDetails") as string
      ),
    };

    // Save files for submitExchangeDetails
    if (formData.get("submitExchangeDetailsZoneOneBanner")) {
      const file = formData.get("submitExchangeDetailsZoneOneBanner") as File;
      parsedData.submitExchangeDetails.zoneOneBanner = await uploadToCloudinary(
        file,
        "banners"
      );
    }

    //og
    // if (formData.getAll("submitExchangeDetailsImages[]").length > 0) {
    //   parsedData.submitExchangeDetails.images = [];
    //   for (const file of formData.getAll("submitExchangeDetailsImages[]")) {
    //     const uploadedUrl = await uploadToCloudinary(file as File, "images");
    //     parsedData.submitExchangeDetails.images.push(uploadedUrl);
    //   }
    // }
    //no 1
    // if (formData.getAll("submitExchangeDetailsImages[]").length > 0) {
    //   parsedData.submitExchangeDetails.images = [];
    //   const images = formData.getAll("submitExchangeDetailsImages[]");

    //   console.log("Debug: submitExchangeDetailsImages[]", images);

    //   for (const entry of images) {
    //     if (entry instanceof File) {
    //       // Type check
    //       console.log(`Uploading Image: ${entry.name}, Size: ${entry.size}`);
    //       const uploadedUrl = await uploadToCloudinary(entry, "images");
    //       console.log(`Uploaded URL: ${uploadedUrl}`);
    //       parsedData.submitExchangeDetails.images.push(uploadedUrl);
    //     } else {
    //       console.warn(
    //         `Unexpected entry in submitExchangeDetailsImages[]:`,
    //         entry
    //       );
    //     }
    //   }
    // }
    // Save files for submitExchangeDetails
    //No 2
    const submitImages = formData.getAll("submitExchangeDetailsImages");
    if (submitImages.length > 0) {
      parsedData.submitExchangeDetails.images = [];
      for (const entry of submitImages) {
        if (entry instanceof File) {
          console.log(`Uploading Image: ${entry.name}, Size: ${entry.size}`);
          const uploadedUrl = await uploadToCloudinary(entry, "images");
          parsedData.submitExchangeDetails.images.push(uploadedUrl);
        }
      }
    }

    //og
    // if (formData.getAll("submitExchangeDetailsUploadedFiles[]").length > 0) {
    //   parsedData.submitExchangeDetails.otherSpecialConditions.uploadedFiles =
    //     [];
    //   for (const file of formData.getAll(
    //     "submitExchangeDetailsUploadedFiles[]"
    //   )) {
    //     const uploadedUrl = await uploadToCloudinary(file as File, "files");
    //     parsedData.submitExchangeDetails.otherSpecialConditions.uploadedFiles.push(
    //       uploadedUrl
    //     );
    //   }
    // }
    // if (formData.getAll("submitExchangeDetailsUploadedFiles[]").length > 0) {
    //   parsedData.submitExchangeDetails.otherSpecialConditions.uploadedFiles =
    //     [];
    //   const uploadedFiles = formData.getAll(
    //     "submitExchangeDetailsUploadedFiles[]"
    //   );

    //   console.log("Debug: submitExchangeDetailsUploadedFiles[]", uploadedFiles);

    //   for (const entry of uploadedFiles) {
    //     if (entry instanceof File) {
    //       console.log(`Uploading File: ${entry.name}, Size: ${entry.size}`);
    //       const uploadedUrl = await uploadToCloudinary(entry, "files");
    //       console.log(`Uploaded URL: ${uploadedUrl}`);
    //       parsedData.submitExchangeDetails.otherSpecialConditions.uploadedFiles.push(
    //         uploadedUrl
    //       );
    //     } else {
    //       console.warn(
    //         `Unexpected entry in submitExchangeDetailsUploadedFiles[]:`,
    //         entry
    //       );
    //     }
    //   }
    // }
    const submitFiles = formData.getAll("submitExchangeDetailsUploadedFiles");
    if (submitFiles.length > 0) {
      parsedData.submitExchangeDetails.otherSpecialConditions.uploadedFiles =
        [];
      for (const entry of submitFiles) {
        if (entry instanceof File) {
          console.log(`Uploading File: ${entry.name}, Size: ${entry.size}`);
          const uploadedUrl = await uploadToCloudinary(entry, "files");
          parsedData.submitExchangeDetails.otherSpecialConditions.uploadedFiles.push(
            uploadedUrl
          );
        }
      }
    }

    // Save files for expectedRequirementsDetails
    if (formData.get("expectedRequirementsDetailsZoneOneBanner")) {
      const file = formData.get(
        "expectedRequirementsDetailsZoneOneBanner"
      ) as File;
      parsedData.expectedRequirementsDetails.zoneOneBanner =
        await uploadToCloudinary(file, "banners");
    }

    //og
    // if (formData.getAll("expectedRequirementsDetailsImages[]").length > 0) {
    //   parsedData.expectedRequirementsDetails.images = [];
    //   for (const file of formData.getAll(
    //     "expectedRequirementsDetailsImages[]"
    //   )) {
    //     const uploadedUrl = await uploadToCloudinary(file as File, "images");
    //     parsedData.expectedRequirementsDetails.images.push(uploadedUrl);
    //   }
    // }
    // if (formData.getAll("expectedRequirementsDetailsImages[]").length > 0) {
    //   parsedData.expectedRequirementsDetails.images = [];
    //   const images = formData.getAll("expectedRequirementsDetailsImages[]");

    //   console.log("Debug: expectedRequirementsDetailsImages[]", images);

    //   for (const entry of images) {
    //     if (entry instanceof File) {
    //       console.log(`Uploading Image: ${entry.name}, Size: ${entry.size}`);
    //       const uploadedUrl = await uploadToCloudinary(entry, "images");
    //       console.log(`Uploaded URL: ${uploadedUrl}`);
    //       parsedData.expectedRequirementsDetails.images.push(uploadedUrl);
    //     } else {
    //       console.warn(
    //         `Unexpected entry in expectedRequirementsDetailsImages[]:`,
    //         entry
    //       );
    //     }
    //   }
    // }

    const expectedImages = formData.getAll("expectedRequirementsDetailsImages");
    if (expectedImages.length > 0) {
      parsedData.expectedRequirementsDetails.images = []; // Corrected key alignment
      for (const entry of expectedImages) {
        if (entry instanceof File) {
          console.log(
            `Uploading Expected Image: ${entry.name}, Size: ${entry.size}`
          );
          const uploadedUrl = await uploadToCloudinary(entry, "images");
          parsedData.expectedRequirementsDetails.images.push(uploadedUrl);
        }
      }
    }

    //og
    // if (
    //   formData.getAll("expectedRequirementsDetailsUploadedFiles[]").length > 0
    // ) {
    //   parsedData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles =
    //     [];
    //   for (const file of formData.getAll(
    //     "expectedRequirementsDetailsUploadedFiles[]"
    //   )) {
    //     const uploadedUrl = await uploadToCloudinary(file as File, "files");
    //     parsedData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles.push(
    //       uploadedUrl
    //     );
    //   }
    // }
    // if (
    //   formData.getAll("expectedRequirementsDetailsUploadedFiles[]").length > 0
    // ) {
    //   parsedData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles =
    //     [];
    //   const uploadedFiles = formData.getAll(
    //     "expectedRequirementsDetailsUploadedFiles[]"
    //   );

    //   console.log(
    //     "Debug: expectedRequirementsDetailsUploadedFiles[]",
    //     uploadedFiles
    //   );

    //   for (const entry of uploadedFiles) {
    //     if (entry instanceof File) {
    //       console.log(`Uploading File: ${entry.name}, Size: ${entry.size}`);
    //       const uploadedUrl = await uploadToCloudinary(entry, "files");
    //       console.log(`Uploaded URL: ${uploadedUrl}`);
    //       parsedData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles.push(
    //         uploadedUrl
    //       );
    //     } else {
    //       console.warn(
    //         `Unexpected entry in expectedRequirementsDetailsUploadedFiles[]:`,
    //         entry
    //       );
    //     }
    //   }
    // }

    // Save files for expectedRequirementsDetails - Uploaded Files
    const expectedFiles = formData.getAll(
      "expectedRequirementsDetailsUploadedFiles"
    );
    if (expectedFiles.length > 0) {
      parsedData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles =
        []; // Corrected key alignment
      for (const entry of expectedFiles) {
        if (entry instanceof File) {
          console.log(
            `Uploading Expected File: ${entry.name}, Size: ${entry.size}`
          );
          const uploadedUrl = await uploadToCloudinary(entry, "files");
          parsedData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles.push(
            uploadedUrl
          );
        }
      }
    }

    const createdBy = getUserIdFromToken(request as NextRequest); // Adjust based on your auth function

    // Create a new ProductForProductExchange document
    const newExchange = new ProductForProductExchange({
      submitExchangeDetails: parsedData.submitExchangeDetails,
      expectedRequirements: parsedData.expectedRequirementsDetails,
      status: "pending",
      createdBy: createdBy, // Replace with actual user ID from authentication
    });

    // Save to MongoDB
    const savedExchange = await newExchange.save();

    return NextResponse.json({
      message: "Data saved successfully",
      data: savedExchange,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
