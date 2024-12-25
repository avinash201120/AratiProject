"use client";

import React, { useState } from "react";
import { Steps } from "antd";
import SubmitExchangeForm from "./component/SubmitExchangeForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentStep } from "@/store/slices/serviceForServiceFormSlice";
import * as Yup from "yup";
import ExpectedRequirements from "@/app/[locale]/dashboard/student/exchanges/serviceforservice/component/ExpectedRequirements";
import Success from "./component/Success";

// const { Step } = Steps;

type FormOfExchange = "Exchange" | "Classic Sale" | "Auction" | "Donation" | "";

type SEDepositPayment =
  | { decision: "yes"; depositPayment: { percentage: string } } // When decision is "yes", percentage is required
  | { decision: "no" | ""; depositPayment: { percentage?: undefined } }; // When decision is "no" or "", percentage is not required

type SubmitExchangeDetails = {
  submitExchangeDetails: {
    zoneOneBanner: File | null;
    title: string;
    offerType: string;
    category: string;
    subcategory: string;
    featuredProductStatus: "New" | "GoodCondition" | "Used" | "";
    additionalDescription: string;
    images: (File | null)[];
    startDate: string;
    endDate: string;
    formOfExchange: ERFormOfExchange;
    materialConditions: {
      hourlyRate: number;
      minimumBenefit: number;
      packageRequested: number;
      travelExpenses: TravelExpenses;
      freeQuote: FreeQuote;
      otherPossibleCost: OtherPossibleCost;
      contingentWarranty: string;
      guarantees: {
        moneyBackGuarantee: "no" | "yes" | "";
        satisfactionGuarantee: "no" | "yes" | "";
      };
      estimatedValue: number;

      depositPayment: DepositPayment;
      otherContingentCoverageRequired: string;

      paymentDetails: {
        desiredPaymentForm: "exchange-sum" | "exchange-service" | "";
        desiredPaymentType:
          | "hand-to-hand"
          | "before-delivery"
          | "after-delivery"
          | "";
      };
    };
    deliveryConditions: {
      pickup: {
        allowed: "yes" | "no" | null;
        details: {
          address: string;
          country: string;
          city: string;
          campus: string;
        };
      };
      delivery: {
        allowed: "yes" | "no" | null;
        costOption?: "yes" | "no" | null;
        details: {
          amount?: number;
          country: string;
          city: string;
        };
      };
    };

    geolocation: {
      campus: string;
      country: string;
    };
    otherSpecialConditions: {
      additionalDescription: string;
      uploadedFiles: File[];
    };
  };
};

const initialValues: SubmitExchangeDetails = {
  submitExchangeDetails: {
    zoneOneBanner: null,
    title: "",
    offerType: "",
    category: "",
    subcategory: "",
    featuredProductStatus: "",
    additionalDescription: "",
    images: [null, null, null],
    startDate: "",
    endDate: "",
    formOfExchange: "",
    materialConditions: {
      hourlyRate: 0,
      minimumBenefit: 0,
      packageRequested: 0,
      travelExpenses: {
        isRequired: null, // Default value
        feeAmount: 0, // Not required if isRequired is "no"
      },
      freeQuote: {
        freeQuote: "", // Default value
        feeAmount: 0, // Not required if freeQuote is "yes"
      },
      otherPossibleCost: {
        otherPossibleCost: "", // Default value
        amountOfCost: 0,
        natureOfTheseCost: "",
      },
      contingentWarranty: "",
      guarantees: {
        moneyBackGuarantee: "", // Default value
        satisfactionGuarantee: "", // Default value
      },
      estimatedValue: 0,

      depositPayment: {
        decision: "",
        percentage: 0,
      },
      otherContingentCoverageRequired: "",

      paymentDetails: {
        desiredPaymentForm: "",
        desiredPaymentType: "",
      },
    },
    deliveryConditions: {
      pickup: {
        allowed: null,
        details: {
          address: "",
          country: "",
          city: "",
          campus: "",
        },
      },
      delivery: {
        allowed: null,
        costOption: null,
        details: {
          amount: 0,
          country: "",
          city: "",
        },
      },
    },
    geolocation: {
      campus: "",
      country: "",
    },
    otherSpecialConditions: {
      additionalDescription: "",
      uploadedFiles: [],
    },
  },
};

// Validation Schema
const SubmitExchangeValidationSchema = Yup.object({
  submitExchangeDetails: Yup.object({
    zoneOneBanner: Yup.mixed<File>()
      .nullable()
      .required("Zone One Banner is required")
      .test(
        "fileType",
        "Unsupported file format. Only JPEG and PNG are allowed.",
        (value) =>
          !value ||
          (value instanceof File &&
            ["image/jpeg", "image/png"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size is too large. Maximum size is 5MB.",
        (value) =>
          !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
      ),
    title: Yup.string().required("Title is required"),
    offerType: Yup.string().required("Offer type is required"),
    category: Yup.string()
      .required("Category is required")
      .oneOf(["Electronics", "Health"], "Invalid category selected"),

    subcategory: Yup.string()
      .required("SubCategory is required")
      .oneOf(["Accessories", "Health"], "Invalid subcategory selected"),
    featuredProductStatus: Yup.string()
      .oneOf(["New", "GoodCondition", "Used"], "Invalid status selected")
      .required("Featured Product Status is required"),
    additionalDescription: Yup.string().required("description is Required"),
    images: Yup.array()
      .of(
        Yup.mixed()
          .nullable() // Allows empty slots
          .test(
            "fileType",
            "Unsupported file format. Only JPEG and PNG are allowed.",
            (value) =>
              !value ||
              (value instanceof File &&
                ["image/jpeg", "image/png"].includes(value.type))
          )
          .test(
            "fileSize",
            "File size is too large. Maximum size is 5MB.",
            (value) =>
              !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
          )
      )
      .test("atLeastOneImage", "At least one image is required", (images) =>
        images ? images.some((image) => image) : false
      )
      .max(3, "You can upload up to 3 images only"),

    startDate: Yup.date()
      .required("Start Date is required")
      .typeError("Invalid date format"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date")
      .typeError("Invalid date format"),
    formOfExchange: Yup.string()
      .oneOf(
        ["Exchange", "Classic Sale", "Auction", "Donation"],
        "Invalid selection"
      )
      .required("Form of Exchange is required"),
    materialConditions: Yup.object({
      hourlyRate: Yup.number()
        .required("Hourly rate is required")
        .min(0, "Hourly rate cannot be negative"),
      minimumBenefit: Yup.number()
        .required("Minimum benefit is required")
        .min(0, "Minimum benefit cannot be negative"),
      packageRequested: Yup.number()
        .required("Package requested is required")
        .min(0, "Package requested cannot be negative"),
      travelExpenses: Yup.object({
        isRequired: Yup.string()
          .oneOf(["yes", "no"], "Invalid selection for travel expenses")
          .required("Travel expenses selection is required"),
        feeAmount: Yup.number()
          .nullable()
          .when("isRequired", {
            is: (value: string | undefined) => value === "yes",
            then: (schema) =>
              schema
                .required(
                  "Fee amount is required if travel expenses are required"
                )
                .min(0, "Fee amount cannot be negative"),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
      freeQuote: Yup.object({
        freeQuote: Yup.string()
          .oneOf(["yes", "no"], "Invalid selection for free quote")
          .required("Free quote selection is required"),
        feeAmount: Yup.number()
          .nullable()
          .when("freeQuote", {
            is: (value: string | undefined) => value === "no", // Explicitly checking the value
            then: (schema) =>
              schema
                .required("Fee amount is required if free quote is not free")
                .min(0, "Fee amount cannot be negative"),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
      otherPossibleCost: Yup.object({
        otherPossibleCost: Yup.string()
          .oneOf(["yes", "no"], "Invalid value for otherPossibleCost")
          .required("Please select if there are other possible costs."),
        amountOfCost: Yup.number()
          .nullable()
          .when("otherPossibleCost", (value: unknown, schema) => {
            if (value === "yes") {
              return schema
                .typeError("Amount of cost must be a number")
                .required(
                  "Amount of cost is required when other costs are selected."
                )
                .positive("Amount must be greater than zero.");
            }
            return schema.nullable(); // Allow null if not required
          }),
        natureOfTheseCost: Yup.string()
          .nullable()
          .when("otherPossibleCost", (value: unknown, schema) => {
            if (value === "yes") {
              return schema
                .required(
                  "Nature of these costs is required when other costs are selected."
                )
                .min(
                  3,
                  "Nature of these costs must be at least 3 characters long."
                );
            }
            return schema.nullable(); // Allow null if not required
          }),
      }),
      contingentWarranty: Yup.string()
        .required("Contingent warranty is required.")
        .min(3, "Contingent warranty must be at least 3 characters long."),
      estimatedValue: Yup.number()
        .required("Estimated value is required.")
        .typeError("Estimated value must be a valid number.")
        .positive("Estimated value must be greater than zero."),
      depositPayment: Yup.object({
        decision: Yup.string()
          .oneOf(["yes", "no"], "Invalid decision")
          .required("Decision is required"),
        percentage: Yup.number().when("decision", {
          is: (decision: string | undefined) =>
            typeof decision === "string" && decision === "yes",
          then: (schema) =>
            schema
              .min(0, "Percentage cannot be less than 0")
              .max(100, "Percentage cannot exceed 100")
              .required("Deposit percentage is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      }),
      otherContingentCoverageRequired: Yup.string()
        .required("Other Contingent Coverage is required")
        .max(255, "Must be 255 characters or less"),
      paymentDetails: Yup.object({
        desiredPaymentForm: Yup.string()
          .oneOf(
            ["exchange-sum", "exchange-service"],
            "Invalid Desired Payment Form"
          )
          .required("Desired Payment Form is required"),
        desiredPaymentType: Yup.string()
          .oneOf(
            ["hand-to-hand", "before-delivery", "after-delivery"],
            "Invalid Desired Payment Type"
          )
          .required("Desired Payment Type is required"),
      }),
      guarantees: Yup.object({
        moneyBackGuarantee: Yup.string()
          .oneOf(["yes", "no"], "Invalid choice")
          .required("Money Back Guarantee is required"),
        satisfactionGuarantee: Yup.string()
          .oneOf(["yes", "no"], "Invalid choice")
          .required("Satisfaction Guarantee is required"),
      }),
    }),
    deliveryConditions: Yup.object({
      delivery: Yup.object({
        allowed: Yup.string()
          .oneOf(["yes", "no"], "Invalid option")
          .required("Delivery allowed is required"),
        costOption: Yup.string().when("allowed", (allowed: unknown) => {
          if (allowed === "yes") {
            return Yup.string()
              .oneOf(["yes", "no"], "Invalid option")
              .required("Cost option is required");
          }
          return Yup.string().nullable();
        }),
        details: Yup.object().when("costOption", (costOption: unknown) => {
          if (costOption === "yes") {
            return Yup.object({
              amount: Yup.string()
                .required("Delivery cost amount is required")
                .matches(/^[0-9]+$/, "Amount must be a valid number"),
              country: Yup.string().required("Country is required"),
              city: Yup.string().required("City is required"),
            });
          }
          return Yup.object().shape({
            amount: Yup.string().nullable(),
            country: Yup.string().nullable(),
            city: Yup.string().nullable(),
          });
        }),
      }),
    }),

    geolocation: Yup.object({
      campus: Yup.string().required("Campus is required"),
      country: Yup.string().required("Country is required"),
    }),
    otherSpecialConditions: Yup.object({
      additionalDescription: Yup.string()
        .required("Additional description is required")
        .max(500, "Description can't exceed 500 characters"),

      uploadedFiles: Yup.array()
        .of(
          Yup.mixed()
            .nullable()
            .test(
              "fileFormat",
              "Invalid file type. Only jpeg, jpg, png, pdf, doc, docx allowed.",
              (value) => {
                if (!value) return false; // Reject null or undefined
                return (
                  value instanceof File &&
                  [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ].includes(value.type)
                );
              }
            )
        )
        .test(
          "requiredFiles",
          "At least one file is required",
          (files) =>
            Array.isArray(files) && files.length > 0 && files[0] !== null
        )
        .max(1, "You can only upload 1 file"),
    }),
  }),
});

type TravelExpenses = {
  isRequired: "yes" | "no" | null; //Represents the value of the radio button
  feeAmount?: number; // Required only if isRequired is "yes"
};

type FreeQuote = {
  freeQuote: "yes" | "no" | ""; // "yes" or "no" //for free quote selection
  feeAmount?: number; // Required only if freeQuote is "no"
};

type OtherPossibleCost = {
  otherPossibleCost: "yes" | "no" | "";
  amountOfCost?: number | null;
  natureOfTheseCost: string;
};

type DepositPayment = {
  decision: "yes" | "no" | "";
  percentage?: number; // Optional field when decision is "no"
};

type ERFormOfExchange =
  | "Exchange"
  | "Classic Sale"
  | "Auction"
  | "Donation"
  | "";

type ExpectedRequirementDetails = {
  expectedRequirementDetails: {
    zoneOneBanner: File | null;
    title: string;
    offerType: string;
    category: string;
    subcategory: string;
    featuredProductStatus: "New" | "GoodCondition" | "Used" | "";
    additionalDescription: string;
    images: (File | null)[];
    startDate: string;
    endDate: string;
    formOfExchange: ERFormOfExchange;
    materialConditions: {
      hourlyRate: number;
      minimumBenefit: number;
      packageRequested: number;
      travelExpenses: TravelExpenses;
      freeQuote: FreeQuote;
      otherPossibleCost: OtherPossibleCost;
      contingentWarranty: string;
      guarantees: {
        moneyBackGuarantee: "no" | "yes" | "";
        satisfactionGuarantee: "no" | "yes" | "";
      };
      estimatedValue: number;

      depositPayment: DepositPayment;
      otherContingentCoverageRequired: string;

      paymentDetails: {
        desiredPaymentForm: "exchange-sum" | "exchange-service" | "";
        desiredPaymentType:
          | "hand-to-hand"
          | "before-delivery"
          | "after-delivery"
          | "";
      };
    };
    deliveryConditions: {
      pickup: {
        allowed: "yes" | "no" | null;
        details: {
          address: string;
          country: string;
          city: string;
          campus: string;
        };
      };
      delivery: {
        allowed: "yes" | "no" | null;
        costOption?: "yes" | "no" | null;
        details: {
          amount?: number;
          country: string;
          city: string;
        };
      };
    };

    geolocation: {
      campus: string;
      country: string;
    };
    otherSpecialConditions: {
      additionalDescription: string;
      uploadedFiles: File[];
    };
  };
};

const expectedRequiremtnsinitialValues: ExpectedRequirementDetails = {
  expectedRequirementDetails: {
    zoneOneBanner: null,
    title: "",
    offerType: "",
    category: "",
    subcategory: "",
    featuredProductStatus: "",
    additionalDescription: "",
    images: [null, null, null],
    startDate: "",
    endDate: "",
    formOfExchange: "",
    materialConditions: {
      hourlyRate: 0,
      minimumBenefit: 0,
      packageRequested: 0,
      travelExpenses: {
        isRequired: null, // Default value
        feeAmount: 0, // Not required if isRequired is "no"
      },
      freeQuote: {
        freeQuote: "", // Default value
        feeAmount: 0, // Not required if freeQuote is "yes"
      },
      otherPossibleCost: {
        otherPossibleCost: "", // Default value
        amountOfCost: 0,
        natureOfTheseCost: "",
      },
      contingentWarranty: "",
      guarantees: {
        moneyBackGuarantee: "", // Default value
        satisfactionGuarantee: "", // Default value
      },
      estimatedValue: 0,

      depositPayment: {
        decision: "",
        percentage: undefined,
      },
      otherContingentCoverageRequired: "",

      paymentDetails: {
        desiredPaymentForm: "",
        desiredPaymentType: "",
      },
    },
    deliveryConditions: {
      pickup: {
        allowed: null,
        details: {
          address: "",
          country: "",
          city: "",
          campus: "",
        },
      },
      delivery: {
        allowed: null,
        costOption: null,
        details: {
          amount: 0,
          country: "",
          city: "",
        },
      },
    },
    geolocation: {
      campus: "",
      country: "",
    },
    otherSpecialConditions: {
      additionalDescription: "",
      uploadedFiles: [],
    },
  },
};

const ExpectedRequirementValidationSchema = Yup.object({
  expectedRequirementDetails: Yup.object({
    zoneOneBanner: Yup.mixed<File>()
      .nullable()
      .required("Zone One Banner is required")
      .test(
        "fileType",
        "Unsupported file format. Only JPEG and PNG are allowed.",
        (value) =>
          !value ||
          (value instanceof File &&
            ["image/jpeg", "image/png"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size is too large. Maximum size is 5MB.",
        (value) =>
          !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
      ),
    title: Yup.string().required("Title is required"),
    offerType: Yup.string().required("Offer type is required"),
    category: Yup.string()
      .required("Category is required")
      .oneOf(["Electronics", "Health"], "Invalid category selected"),

    subcategory: Yup.string()
      .required("SubCategory is required")
      .oneOf(["Accessories", "Health"], "Invalid subcategory selected"),
    featuredProductStatus: Yup.string()
      .oneOf(["New", "GoodCondition", "Used"], "Invalid status selected")
      .required("Featured Product Status is required"),
    additionalDescription: Yup.string().required("description is Required"),
    images: Yup.array()
      .of(
        Yup.mixed()
          .nullable() // Allows empty slots
          .test(
            "fileType",
            "Unsupported file format. Only JPEG and PNG are allowed.",
            (value) =>
              !value ||
              (value instanceof File &&
                ["image/jpeg", "image/png"].includes(value.type))
          )
          .test(
            "fileSize",
            "File size is too large. Maximum size is 5MB.",
            (value) =>
              !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
          )
      )
      .test("atLeastOneImage", "At least one image is required", (images) =>
        images ? images.some((image) => image) : false
      )
      .max(3, "You can upload up to 3 images only"),

    startDate: Yup.date()
      .required("Start Date is required")
      .typeError("Invalid date format"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date")
      .typeError("Invalid date format"),
    formOfExchange: Yup.string()
      .oneOf(
        ["Exchange", "Classic Sale", "Auction", "Donation"],
        "Invalid selection"
      )
      .required("Form of Exchange is required"),
    materialConditions: Yup.object({
      hourlyRate: Yup.number()
        .required("Hourly rate is required")
        .min(0, "Hourly rate cannot be negative"),
      minimumBenefit: Yup.number()
        .required("Minimum benefit is required")
        .min(0, "Minimum benefit cannot be negative"),
      packageRequested: Yup.number()
        .required("Package requested is required")
        .min(0, "Package requested cannot be negative"),
      travelExpenses: Yup.object({
        isRequired: Yup.string()
          .oneOf(["yes", "no"], "Invalid selection for travel expenses")
          .required("Travel expenses selection is required"),
        feeAmount: Yup.number()
          .nullable()
          .when("isRequired", {
            is: (value: string | undefined) => value === "yes",
            then: (schema) =>
              schema
                .required(
                  "Fee amount is required if travel expenses are required"
                )
                .min(0, "Fee amount cannot be negative"),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
      freeQuote: Yup.object({
        freeQuote: Yup.string()
          .oneOf(["yes", "no"], "Invalid selection for free quote")
          .required("Free quote selection is required"),
        feeAmount: Yup.number()
          .nullable()
          .when("freeQuote", {
            is: (value: string | undefined) => value === "no", // Explicitly checking the value
            then: (schema) =>
              schema
                .required("Fee amount is required if free quote is not free")
                .min(0, "Fee amount cannot be negative"),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
      otherPossibleCost: Yup.object({
        otherPossibleCost: Yup.string()
          .oneOf(["yes", "no"], "Invalid value for otherPossibleCost")
          .required("Please select if there are other possible costs."),
        amountOfCost: Yup.number()
          .nullable()
          .when("otherPossibleCost", (value: unknown, schema) => {
            if (value === "yes") {
              return schema
                .typeError("Amount of cost must be a number")
                .required(
                  "Amount of cost is required when other costs are selected."
                )
                .positive("Amount must be greater than zero.");
            }
            return schema.nullable(); // Allow null if not required
          }),
        natureOfTheseCost: Yup.string()
          .nullable()
          .when("otherPossibleCost", (value: unknown, schema) => {
            if (value === "yes") {
              return schema
                .required(
                  "Nature of these costs is required when other costs are selected."
                )
                .min(
                  3,
                  "Nature of these costs must be at least 3 characters long."
                );
            }
            return schema.nullable(); // Allow null if not required
          }),
      }),
      contingentWarranty: Yup.string()
        .required("Contingent warranty is required.")
        .min(3, "Contingent warranty must be at least 3 characters long."),
      estimatedValue: Yup.number()
        .required("Estimated value is required.")
        .typeError("Estimated value must be a valid number.")
        .positive("Estimated value must be greater than zero."),
      depositPayment: Yup.object({
        decision: Yup.string()
          .oneOf(["yes", "no"], "Invalid decision")
          .required("Decision is required"),
        percentage: Yup.number().when("decision", {
          is: (decision: string | undefined) =>
            typeof decision === "string" && decision === "yes",
          then: (schema) =>
            schema
              .min(0, "Percentage cannot be less than 0")
              .max(100, "Percentage cannot exceed 100")
              .required("Deposit percentage is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      }),
      otherContingentCoverageRequired: Yup.string()
        .required("Other Contingent Coverage is required")
        .max(255, "Must be 255 characters or less"),
      paymentDetails: Yup.object({
        desiredPaymentForm: Yup.string()
          .oneOf(
            ["exchange-sum", "exchange-service"],
            "Invalid Desired Payment Form"
          )
          .required("Desired Payment Form is required"),
        desiredPaymentType: Yup.string()
          .oneOf(
            ["hand-to-hand", "before-delivery", "after-delivery"],
            "Invalid Desired Payment Type"
          )
          .required("Desired Payment Type is required"),
      }),
      guarantees: Yup.object({
        moneyBackGuarantee: Yup.string()
          .oneOf(["yes", "no"], "Invalid choice")
          .required("Money Back Guarantee is required"),
        satisfactionGuarantee: Yup.string()
          .oneOf(["yes", "no"], "Invalid choice")
          .required("Satisfaction Guarantee is required"),
      }),
    }),
    deliveryConditions: Yup.object({
      delivery: Yup.object({
        allowed: Yup.string()
          .oneOf(["yes", "no"], "Invalid option")
          .required("Delivery allowed is required"),
        costOption: Yup.string().when("allowed", (allowed: unknown) => {
          if (allowed === "yes") {
            return Yup.string()
              .oneOf(["yes", "no"], "Invalid option")
              .required("Cost option is required");
          }
          return Yup.string().nullable();
        }),
        details: Yup.object().when("costOption", (costOption: unknown) => {
          if (costOption === "yes") {
            return Yup.object({
              amount: Yup.string()
                .required("Delivery cost amount is required")
                .matches(/^[0-9]+$/, "Amount must be a valid number"),
              country: Yup.string().required("Country is required"),
              city: Yup.string().required("City is required"),
            });
          }
          return Yup.object().shape({
            amount: Yup.string().nullable(),
            country: Yup.string().nullable(),
            city: Yup.string().nullable(),
          });
        }),
      }),
    }),

    geolocation: Yup.object({
      campus: Yup.string().required("Campus is required"),
      country: Yup.string().required("Country is required"),
    }),
    otherSpecialConditions: Yup.object({
      additionalDescription: Yup.string()
        .required("Additional description is required")
        .max(500, "Description can't exceed 500 characters"),

      uploadedFiles: Yup.array()
        .of(
          Yup.mixed()
            .nullable()
            .test(
              "fileFormat",
              "Invalid file type. Only jpeg, jpg, png, pdf, doc, docx allowed.",
              (value) => {
                if (!value) return false; // Reject null or undefined
                return (
                  value instanceof File &&
                  [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ].includes(value.type)
                );
              }
            )
        )
        .test(
          "requiredFiles",
          "At least one file is required",
          (files) =>
            Array.isArray(files) && files.length > 0 && files[0] !== null
        )
        .max(1, "You can only upload 1 file"),
    }),
  }),
});

const MultiStepForm = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] =
    useState<SubmitExchangeDetails>(initialValues);
  console.log("pc", formValues);
  const [expectedRequirementFormValue, setExpectedRequirementFormValue] =
    useState<ExpectedRequirementDetails>(expectedRequiremtnsinitialValues);

  const { currentStep } = useSelector(
    (state: RootState) => state.serviceForServiceExchangeForm
  );

  // Function to submit merged data to API
  const submitExchangeFormDetails = async (mergedData: any) => {
    const formData = new FormData();

    // Function to append data to FormData recursively
    const appendToFormData = (data: any, parentKey = "") => {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        const formKey = parentKey ? `${parentKey}.${key}` : key;

        if (value instanceof File) {
          formData.append(formKey, value); // Append file directly
        } else if (Array.isArray(value)) {
          // Handle arrays
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${formKey}[${index}]`, item);
            } else {
              formData.append(`${formKey}[${index}]`, JSON.stringify(item));
            }
          });
        } else if (typeof value === "object" && value !== null) {
          // Recursively handle nested objects
          appendToFormData(value, formKey);
        } else {
          // Append primitive values
          formData.append(formKey, value);
        }
      });
    };

    // Add submitExchangeDetails and expectedRequirementDetails to FormData
    appendToFormData(mergedData.submitExchangeDetails, "submitExchangeDetails");
    appendToFormData(
      mergedData.expectedRequirementDetails,
      "expectedRequirementDetails"
    );

    // Fetch request with multipart formData
    const response = await fetch(
      "/api/student/exchanges/serviceforserviceexchange",
      {
        method: "POST",
        body: formData, // Use FormData as the body
      }
    );

    // Handle response
    if (response.ok) {
      const result = await response.json();
      dispatch(setCurrentStep(currentStep + 1)); // Navigate to the success step
      setTimeout(() => {
        dispatch(setCurrentStep(0)); // Navigate to the success step
      }, 6000);
      console.log("Form submitted successfully:", result);
    } else {
      console.error("Error submitting form:", await response.text());
    }
  };

  // Handle Next Button
  const handleNext = (currentChildData: any) => {
    if (currentStep === 1) {
      // Update first child data
      setFormValues((prev) => ({
        ...prev,
        ...currentChildData,
      }));
    } else if (currentStep === 2) {
      // Update second child data
      setExpectedRequirementFormValue((prev) => ({
        ...prev,
        ...currentChildData,
      }));

      // Merge data from both forms and call API
      const mergedData = {
        ...formValues,
        ...expectedRequirementFormValue,
        ...currentChildData,
      };

      console.log("Merged Data Before API Call:", mergedData);
      submitExchangeFormDetails(mergedData);
    }

    console.log("in near dispatc");

    dispatch(setCurrentStep(currentStep + 1));
  };

  // Handle Back Button
  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const steps = [
    { title: "Submit an Exchange Offer", description: "Submit Your Exchange" },
    { title: "Expected Requirements", description: "What do you need?" },
    { title: "Success", description: "Review and confirm" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Steps Progress Bar */}
      <Steps
        current={currentStep - 1}
        items={steps}
        className="mb-6 flex flex-row gap-4 overflow-x-auto whitespace-nowrap"
      />

      {/* Step Content */}
      {currentStep === 1 && (
        <SubmitExchangeForm
          initialValues={formValues}
          validationSchema={SubmitExchangeValidationSchema}
          onSubmit={(values) => handleNext(values)} // Pass data to parent
          setFormValues={setFormValues} // Pass the setter function
        />
      )}

      {currentStep === 2 && (
        <ExpectedRequirements
          initialValues={expectedRequirementFormValue}
          validationSchema={ExpectedRequirementValidationSchema}
          previousData={formValues} // Pass first child data to second child
          onSubmit={(values) => handleNext(values)} // Handle merged data in parent
          setExpectedRequirementFormValue={setExpectedRequirementFormValue} // Pass the setter function
        />
      )}

      {currentStep === 3 && <Success />}

      {/* Back Button */}
      <div className="flex justify-start mt-6">
        {/* {currentStep > 1 && ( */}
        <button
          onClick={handleBack} // Navigate back to the previous step
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Back
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default MultiStepForm;
