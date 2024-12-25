import ServiceForServiceExchangeModel from "@/models/student/ServiceForServiceExchange/ServiceForServiceExchangeModel";
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

    console.log("sfs", formData);
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
    const newExchange = new ServiceForServiceExchangeModel({
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
