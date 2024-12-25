import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldInputProps,
  FormikProps,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "@/store/slices/productForProductFormSlice";
import { useFormContext } from "./FormContext";
import { ProductForProductFormContextType } from "@/types/ProductForProductFormContextType";

const validationSchema = Yup.object({
  zoneOneBanner: Yup.mixed<File>()
    .nullable()
    .required("Zone One Banner is required")
    .test(
      "fileType",
      "Unsupported file format. Only images are allowed.",
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
  images: Yup.array()
    .of(
      Yup.mixed<File>()
        .nullable()
        .test(
          "is-valid-file",
          "Each item must be a valid file or null",
          (value) => value === null || value instanceof File
        )
    )
    .min(1, "At least one image is required")
    .max(3, "No more than 3 images are allowed"),

  offerType: Yup.string()
    .oneOf(["Good", "Service"], "Invalid Offer Type")
    .required("Offer Type is required"),
  category: Yup.string().required("Category is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  featuredProductStatus: Yup.string()
    .oneOf(["New", "GoodCondition", "Used"], "Invalid Product Status")
    .required("Product Status is required"),
  additionalDescription: Yup.string().optional(),

  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date can't be before start date"),

  formOfExchange: Yup.string()
    .oneOf(
      ["Exchange", "Classic Sale", "Auction", "Donation"],
      "Invalid Exchange Type"
    )
    .required("Form of Exchange is required"),

  materialConditions: Yup.object({
    estimatedValue: Yup.number()
      .required("Estimated value is required")
      .min(0, "Value cannot be negative"),
    decision: Yup.string()
      .oneOf(["yes", "no"], "Invalid decision")
      .required("Decision is required"),
    depositPayment: Yup.object({
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
    otherContingentCoverageRequired: Yup.string().optional(),
  }),

  guarantees: Yup.object({
    moneyBackGuarantee: Yup.string()
      .oneOf(["yes", "no"], "Invalid value")
      .required("Money back guarantee is required"),
    satisfactionGuarantee: Yup.string()
      .oneOf(["yes", "no"], "Invalid value")
      .required("Satisfaction guarantee is required"),
  }),

  paymentDetails: Yup.object({
    desiredPaymentForm: Yup.string().required("Payment form is required"),
    desiredPaymentType: Yup.string().required("Payment type is required"),
  }),

  deliveryConditions: Yup.object({
    pickup: Yup.object({
      allowed: Yup.string()
        .oneOf(["yes", "no"], "Invalid option")
        .required("Pickup allowed is required"),
      details: Yup.object().when("allowed", (allowed: unknown) => {
        if (allowed === "yes") {
          return Yup.object({
            address: Yup.string().required("Address is required"),
            country: Yup.string().required("Country is required"),
            city: Yup.string().required("City is required"),
            campus: Yup.string().required("Campus is required"),
          });
        }
        return Yup.object().nullable(); // Allow null if not "yes"
      }),
    }),
    delivery: Yup.object({
      allowed: Yup.string()
        .oneOf(["yes", "no"], "Invalid option")
        .required("Delivery allowed is required"),
      details: Yup.object().when("allowed", (allowed: unknown) => {
        if (allowed === "yes") {
          return Yup.object({
            cost: Yup.number()
              .required("Cost is required")
              .min(0, "Invalid cost"),
            country: Yup.string().required("Country is required"),
            city: Yup.string().required("City is required"),
          });
        }
        return Yup.object().nullable(); // Allow null if not "yes"
      }),
    }),
  }),

  geolocation: Yup.object({
    campus: Yup.string().required("Campus location is required"),
    country: Yup.string().required("Country is required"),
  }),

  otherSpecialConditions: Yup.object({
    additionalDescription: Yup.string().optional(),

    uploadedFiles: Yup.array()
      .of(
        Yup.mixed<File>()
          .required("File is required")
          .test(
            "fileType",
            "Unsupported file format. Only images or documents are allowed.",
            (value) => {
              if (!value) return false;
              const supportedTypes = [
                "image/jpeg",
                "image/png",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ];
              console.log("Validating file type:", value?.type); // Debug log
              return (
                value instanceof File && supportedTypes.includes(value.type)
              );
            }
          )
          .test(
            "fileSize",
            "File size is too large. Maximum size is 5MB.",
            (value) => value instanceof File && value.size <= 5 * 1024 * 1024
          )
      )
      .min(1, "At least one file is required")
      .required("File is required"),
  }),
});

const ExpectedrequirementsForm = () => {
  const { formData, setFormData, resetFormData } = useFormContext();
  console.log(formData);
  const dispatch = useDispatch();
  const t = useTranslations("form");

  const [previewFileIcon, setPreviewFileIcon] = React.useState<string | null>(
    null
  );

  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(
    null
  );

  const [previewImages, setPreviewImages] = React.useState<(string | null)[]>([
    null,
    null,
    null,
  ]);

  const [previewZoneOneBanner, setPreviewZoneOneBanner] = React.useState<
    string | null
  >(null);

  const initialValues: ProductForProductFormContextType["formData"]["expectedRequirementsDetails"] =
    {
      zoneOneBanner: null,
      title: "",
      images: [null, null, null], // Array of File or null
      offerType: "",
      category: "",
      subcategory: "",
      featuredProductStatus: "",
      additionalDescription: "",
      startDate: null, // Represented as a Date or null
      endDate: null, // Represented as a Date or null
      formOfExchange: "",
      materialConditions: {
        estimatedValue: "",
        decision: "",
        depositPayment: { percentage: "" },
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
          details: {
            address: "",
            country: "",
            city: "",
            campus: "",
          },
        },
        delivery: {
          allowed: "",
          details: {
            cost: "",
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
        uploadedFiles: [], // Array of File
      },
      file: null,
    };

  const handleSubmit = async () => {
    try {
      // Create a new FormData instance
      const formDataPayload = new FormData();
      console.log("Initial FormDataPayload:", formDataPayload);

      // ** Add Files for `submitExchangeDetails` **
      // Append Zone One Banner
      if (formData.submitExchangeDetails.zoneOneBanner) {
        console.log(
          "Appending Zone One Banner:",
          formData.submitExchangeDetails.zoneOneBanner
        );
        formDataPayload.append(
          "submitExchangeDetailsZoneOneBanner",
          formData.submitExchangeDetails.zoneOneBanner
        );
      }

      // Append Images
      formData.submitExchangeDetails.images.forEach((image) => {
        if (image) {
          console.log("Appending Image:", image);
          formDataPayload.append("submitExchangeDetailsImages", image);
        }
      });

      // Append Uploaded Files
      formData.submitExchangeDetails.otherSpecialConditions.uploadedFiles.forEach(
        (file) => {
          if (file) {
            console.log("Appending Uploaded File:", file);
            formDataPayload.append("submitExchangeDetailsUploadedFiles", file);
          }
        }
      );

      // Append JSON object for `submitExchangeDetails`
      const submitExchangeDetailsJSON = JSON.stringify({
        title: formData.submitExchangeDetails.title,
        offerType: formData.submitExchangeDetails.offerType,
        category: formData.submitExchangeDetails.category,
        subcategory: formData.submitExchangeDetails.subcategory,
        featuredProductStatus:
          formData.submitExchangeDetails.featuredProductStatus,
        additionalDescription:
          formData.submitExchangeDetails.additionalDescription,
        startDate: formData.submitExchangeDetails.startDate,
        endDate: formData.submitExchangeDetails.endDate,
        formOfExchange: formData.submitExchangeDetails.formOfExchange,
        materialConditions: formData.submitExchangeDetails.materialConditions,
        guarantees: formData.submitExchangeDetails.guarantees,
        paymentDetails: formData.submitExchangeDetails.paymentDetails,
        deliveryConditions: formData.submitExchangeDetails.deliveryConditions,
        geolocation: formData.submitExchangeDetails.geolocation,
        zoneOneBanner: formData.submitExchangeDetails.zoneOneBanner
          ? `/uploads/banner/${formData.submitExchangeDetails.zoneOneBanner.name}`
          : null,
        images: formData.submitExchangeDetails.images.map((image) =>
          image ? `/uploads/images/${image.name}` : null
        ),
        otherSpecialConditions: {
          ...formData.submitExchangeDetails.otherSpecialConditions,
          uploadedFiles:
            formData.submitExchangeDetails.otherSpecialConditions.uploadedFiles.map(
              (file) => (file ? `/uploads/files/${file.name}` : null)
            ),
        },
      });
      console.log("submitExchangeDetails JSON:", submitExchangeDetailsJSON);
      formDataPayload.append(
        "submitExchangeDetails",
        submitExchangeDetailsJSON
      );

      // ** Add Files for `expectedRequirementsDetails` **
      // Append Zone One Banner
      if (formData.expectedRequirementsDetails.zoneOneBanner) {
        console.log(
          "Appending Zone One Banner for Expected Requirements:",
          formData.expectedRequirementsDetails.zoneOneBanner
        );
        formDataPayload.append(
          "expectedRequirementsDetailsZoneOneBanner",
          formData.expectedRequirementsDetails.zoneOneBanner
        );
      }

      // Append Images
      formData.expectedRequirementsDetails.images.forEach((image) => {
        if (image) {
          console.log("Appending Image:", image);
          formDataPayload.append("expectedRequirementsDetailsImages", image);
        }
      });

      // Append Uploaded Files
      formData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles.forEach(
        (file) => {
          if (file) {
            console.log("Appending Uploaded File:", file);
            formDataPayload.append(
              "expectedRequirementsDetailsUploadedFiles",
              file
            );
          }
        }
      );

      // Append JSON object for `expectedRequirementsDetails`
      const expectedRequirementsDetailsJSON = JSON.stringify({
        title: formData.expectedRequirementsDetails.title,
        offerType: formData.expectedRequirementsDetails.offerType,
        category: formData.expectedRequirementsDetails.category,
        subcategory: formData.expectedRequirementsDetails.subcategory,
        featuredProductStatus:
          formData.expectedRequirementsDetails.featuredProductStatus,
        additionalDescription:
          formData.expectedRequirementsDetails.additionalDescription,
        startDate: formData.expectedRequirementsDetails.startDate,
        endDate: formData.expectedRequirementsDetails.endDate,
        formOfExchange: formData.expectedRequirementsDetails.formOfExchange,
        materialConditions:
          formData.expectedRequirementsDetails.materialConditions,
        guarantees: formData.expectedRequirementsDetails.guarantees,
        paymentDetails: formData.expectedRequirementsDetails.paymentDetails,
        deliveryConditions:
          formData.expectedRequirementsDetails.deliveryConditions,
        geolocation: formData.expectedRequirementsDetails.geolocation,
        zoneOneBanner: formData.expectedRequirementsDetails.zoneOneBanner
          ? `/uploads/banner/${formData.expectedRequirementsDetails.zoneOneBanner.name}`
          : null,
        images: formData.expectedRequirementsDetails.images.map((image) =>
          image ? `/uploads/images/${image.name}` : null
        ),
        otherSpecialConditions: {
          ...formData.expectedRequirementsDetails.otherSpecialConditions,
          uploadedFiles:
            formData.expectedRequirementsDetails.otherSpecialConditions.uploadedFiles.map(
              (file) => (file ? `/uploads/files/${file.name}` : null)
            ),
        },
      });
      console.log(
        "expectedRequirementsDetails JSON:",
        expectedRequirementsDetailsJSON
      );
      formDataPayload.append(
        "expectedRequirementsDetails",
        expectedRequirementsDetailsJSON
      );

      // Debug FormData before sending
      console.log("FormDataPayload before API call:");
      for (const [key, value] of formDataPayload.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File Name - ${value.name}, File Type - ${value.type}`
          );
        } else {
          console.log(`${key}:`, value);
        }
      }

      console.log(formDataPayload);

      // API Call
      const response = await fetch(
        "/api/student/exchanges/productforproductexchange",
        {
          method: "POST",
          body: formDataPayload,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const responseData = await response.json();
      if (response.ok) {
        resetFormData();
        dispatch(setCurrentStep(3));

        // Delay for 3 seconds (3000 milliseconds) before resetting to step 0
        setTimeout(() => {
          dispatch(setCurrentStep(0)); // Reset to the initial step
        }, 6000); // Change delay duration as needed (3 seconds in this case)
      }
      console.log("Form submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues} // Use standalone initialValues
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Formik Submitted Values:", values);

        // Synchronize Formik values back to FormContext
        setFormData((prevData) => ({
          ...prevData,
          expectedRequirementsDetails: values,
        }));

        handleSubmit(); // Call your existing handleSubmit function
      }}
      enableReinitialize
    >
      {({ setFieldValue, errors, isValid, values }) => (
        <Form className="space-y-6 p-4 md:p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto border border-gray-200">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
              {t(`Details Of The Expected Requirements`)}
            </h2>
            <p className="text-gray-600">
              {t(
                `Finance Your Projects Or Expenses With Your Unused Services Or Goods!`
              )}
            </p>
          </div>

          {/* Zone 1 Insertion Banner */}
          <div className="text-center p-5">
            <h2 className="mb-5 text-lg font-bold">
              {t("Zone 1 Insertion Banner Advertising")}
            </h2>
            <label
              htmlFor="zoneOneBanner"
              className="inline-block cursor-pointer p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <Image
                src={previewZoneOneBanner || "/imagetoselect.png"}
                alt="Upload Banner"
                className="max-w-full h-auto mx-auto mb-2"
                width={100}
                height={100}
              />
              <p className="text-gray-600">Click to upload</p>
            </label>
            <Field name="zoneOneBanner">
              {({ field }: FieldProps) => (
                <input
                  id="zoneOneBanner"
                  type="file"
                  name={field.name}
                  accept="image/*"
                  className="hidden"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0] || null;

                    // Update Formik state
                    setFieldValue("zoneOneBanner", file);

                    // Synchronize with FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        zoneOneBanner: file,
                      },
                    }));

                    // Update preview
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setPreviewZoneOneBanner(reader.result as string);
                      reader.readAsDataURL(file);
                    } else {
                      setPreviewZoneOneBanner(null);
                    }
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="zoneOneBanner"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t(`Title of the Offer`)}
            </label>
            <Field name="title">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  placeholder="Enter Title"
                  className="w-full p-2 border rounded-md"
                  value={values.title} // Use Formik's value
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = event.target.value;

                    // Update Formik state
                    setFieldValue("title", newValue);

                    // Synchronize with FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        title: newValue,
                      },
                    }));
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Offer Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t(`What do you Offer`)}
            </label>
            <div role="group" className="flex flex-wrap gap-4">
              <label>
                <Field
                  type="radio"
                  name="offerType"
                  value="Good"
                  checked={values.offerType === "Good"} // Use Formik's value
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedValue = event.target.value;

                    // Update Formik state
                    setFieldValue("offerType", selectedValue);

                    // Synchronize with FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        offerType: selectedValue,
                      },
                    }));
                  }}
                />{" "}
                Good
              </label>
              <label>
                <Field
                  type="radio"
                  name="offerType"
                  value="Service"
                  checked={values.offerType === "Service"} // Use Formik's value
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedValue = event.target.value;

                    // Update Formik state
                    setFieldValue("offerType", selectedValue);

                    // Synchronize with FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        offerType: selectedValue,
                      },
                    }));
                  }}
                />{" "}
                Service
              </label>
            </div>
            <ErrorMessage
              name="offerType"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Category`)}
              </label>
              <Field
                as="select"
                name="category"
                className="w-full p-2 border rounded-md"
                value={values.category} // Use Formik's value
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedValue = event.target.value;

                  // Update Formik state
                  setFieldValue("category", selectedValue);

                  // Synchronize with FormContext
                  setFormData((prevData) => ({
                    ...prevData,
                    expectedRequirementsDetails: {
                      ...prevData.expectedRequirementsDetails,
                      category: selectedValue,
                    },
                  }));
                }}
              >
                <option value="" disabled>
                  {t(`Select Category`)}
                </option>
                <option value="Electronics">{t(`Electronics`)}</option>
                <option value="Health">{t(`Health`)}</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`SubCategory`)}
              </label>
              <Field
                as="select"
                name="subcategory"
                className="w-full p-2 border rounded-md"
                value={values.subcategory} // Use Formik's value
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedValue = event.target.value;

                  // Update Formik state
                  setFieldValue("subcategory", selectedValue);

                  // Synchronize with FormContext
                  setFormData((prevData) => ({
                    ...prevData,
                    expectedRequirementsDetails: {
                      ...prevData.expectedRequirementsDetails,
                      subcategory: selectedValue,
                    },
                  }));
                }}
              >
                <option value="" disabled>
                  {t(`Select SubCategory`)}
                </option>
                <option value="Accessories">{t(`Accessories`)}</option>
                <option value="Health">{t(`Health`)}</option>
              </Field>
              <ErrorMessage
                name="subcategory"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Featured Product Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t(`FeaturedProductStatus`)}
            </label>
            <Field name="featuredProductStatus">
              {({ field }: FieldProps) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  value={
                    formData.expectedRequirementsDetails
                      .featuredProductStatus || ""
                  }
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const selectedValue = event.target.value;

                    // Update Formik state
                    setFieldValue("featuredProductStatus", selectedValue);

                    // Update FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        featuredProductStatus: selectedValue,
                      },
                    }));
                  }}
                >
                  <option value="" disabled>
                    {t(`Select Status`)}
                  </option>
                  <option value="New">{t(`New`)}</option>
                  <option value="GoodCondition">{t(`Good Condition`)}</option>
                  <option value="Used">{t(`Used`)}</option>
                </select>
              )}
            </Field>
            <ErrorMessage
              name="featuredProductStatus"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Additional Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t(`Additional Description`)}
            </label>
            <Field name="additionalDescription">
              {({ field }: FieldProps) => (
                <textarea
                  {...field}
                  placeholder="Enter additional details about your offer"
                  className="w-full p-2 border rounded-md"
                  value={
                    formData.expectedRequirementsDetails
                      .additionalDescription || ""
                  }
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const value = event.target.value;

                    // Update FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        additionalDescription: value,
                      },
                    }));

                    // Update Formik state
                    setFieldValue("additionalDescription", value);
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="additionalDescription"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Images to Select */}
          <div className="mt-4">
            <label
              htmlFor="offer-images"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {t(`Upload Any Images Of The Offer`)}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <label
                    htmlFor={`offer-image-${index}`}
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-400 hover:bg-gray-50"
                  >
                    <Image
                      src={previewImages[index] || "/imagetoselect.png"} // Show dynamic preview or default placeholder
                      alt="Select Image"
                      className="object-cover w-20 h-20 rounded-md"
                      width={100}
                      height={100}
                    />
                    <span className="text-sm text-gray-500">Select Image</span>
                  </label>
                  <Field name={`images[${index}]`}>
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="file"
                        id={`offer-image-${index}`}
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;

                          // Update Formik state
                          setFieldValue(`images[${index}]`, file);

                          // Update FormContext
                          setFormData((prevData) => {
                            const updatedImages = [
                              ...prevData.expectedRequirementsDetails.images,
                            ];
                            updatedImages[index] = file || null; // Use null as the fallback
                            return {
                              ...prevData,
                              expectedRequirementsDetails: {
                                ...prevData.expectedRequirementsDetails,
                                images: updatedImages,
                              },
                            };
                          });

                          // Update preview
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              setPreviewImages((prev) => {
                                const updatedPreviews = [...prev];
                                updatedPreviews[index] =
                                  reader.result as string;
                                return updatedPreviews;
                              });
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setPreviewImages((prev) => {
                              const updatedPreviews = [...prev];
                              updatedPreviews[index] = null;
                              return updatedPreviews;
                            });
                          }
                        }}
                        value={undefined} // Ensure it is always undefined for uncontrolled input
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>
            <ErrorMessage
              name="images"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>

          {/* Offer Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`OfferStartDate`)}
              </label>
              <Field name="startDate">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={
                      formData.expectedRequirementsDetails.startDate instanceof
                        Date &&
                      !isNaN(
                        formData.expectedRequirementsDetails.startDate.getTime()
                      )
                        ? formData.expectedRequirementsDetails.startDate
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value
                        ? new Date(event.target.value)
                        : null;

                      // Update FormContext
                      setFormData((prevData) => ({
                        ...prevData,
                        expectedRequirementsDetails: {
                          ...prevData.expectedRequirementsDetails,
                          startDate: value,
                        },
                      }));

                      // Update Formik state
                      setFieldValue("startDate", value);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`OfferEndDate`)}
              </label>
              <Field name="endDate">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={
                      formData.expectedRequirementsDetails.endDate instanceof
                        Date &&
                      !isNaN(
                        formData.expectedRequirementsDetails.endDate.getTime()
                      )
                        ? formData.expectedRequirementsDetails.endDate
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value
                        ? new Date(event.target.value)
                        : null;

                      // Update FormContext
                      setFormData((prevData) => ({
                        ...prevData,
                        expectedRequirementsDetails: {
                          ...prevData.expectedRequirementsDetails,
                          endDate: value,
                        },
                      }));

                      // Update Formik state
                      setFieldValue("endDate", value);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Form of Exchange */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t(`FormOfExchange`)}
            </label>
            <Field name="formOfExchange">
              {({ field }: FieldProps) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  value={
                    formData.expectedRequirementsDetails.formOfExchange || ""
                  }
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;

                    // Update FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        formOfExchange: value,
                      },
                    }));

                    // Update Formik state
                    setFieldValue("formOfExchange", value);
                  }}
                >
                  <option value="" disabled>
                    {t(`Select Form of Exchange`)}
                  </option>
                  <option value="Exchange">{t(`Exchange`)}</option>
                  <option value="Classic Sale">{t(`Classic Sale`)}</option>
                  <option value="Auction">{t(`Auction`)}</option>
                  <option value="Donation">{t(`Donation`)}</option>
                </select>
              )}
            </Field>
            <ErrorMessage
              name="formOfExchange"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Material Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center">
              {t("Material conditions of the exchange")}
            </h3>
            <div>
              <label className="font-semibold text-gray-700">
                {t("Estimated value of the exchange")}
              </label>
              <Field name="materialConditions.estimatedValue">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={
                      formData.expectedRequirementsDetails.materialConditions
                        .estimatedValue || ""
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value;

                      // Update FormContext
                      setFormData((prevData) => ({
                        ...prevData,
                        expectedRequirementsDetails: {
                          ...prevData.expectedRequirementsDetails,
                          materialConditions: {
                            ...prevData.expectedRequirementsDetails
                              .materialConditions,
                            estimatedValue: value,
                          },
                        },
                      }));

                      // Update Formik state
                      setFieldValue("materialConditions.estimatedValue", value);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="materialConditions.estimatedValue"
                component="div"
                className="text-red-500 text-sm"
              />

              <div>
                <label className="block text-gray-700 mb-1">
                  {t("Deposit Payment for booking")}
                </label>
                <div role="group" className="flex gap-4">
                  <label>
                    <Field
                      type="radio"
                      name="materialConditions.decision"
                      value="yes"
                      checked={
                        formData.expectedRequirementsDetails.materialConditions
                          .decision === "yes"
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;

                        // Update FormContext
                        setFormData((prevData) => ({
                          ...prevData,
                          expectedRequirementsDetails: {
                            ...prevData.expectedRequirementsDetails,
                            materialConditions: {
                              ...prevData.expectedRequirementsDetails
                                .materialConditions,
                              decision: value,
                            },
                          },
                        }));

                        // Update Formik state
                        setFieldValue("materialConditions.decision", value);
                      }}
                    />{" "}
                    {t("yes")}
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="materialConditions.decision"
                      value="no"
                      checked={
                        formData.expectedRequirementsDetails.materialConditions
                          .decision === "no"
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;

                        // Update FormContext
                        setFormData((prevData) => ({
                          ...prevData,
                          expectedRequirementsDetails: {
                            ...prevData.expectedRequirementsDetails,
                            materialConditions: {
                              ...prevData.expectedRequirementsDetails
                                .materialConditions,
                              decision: value,
                            },
                          },
                        }));

                        // Update Formik state
                        setFieldValue("materialConditions.decision", value);
                      }}
                    />{" "}
                    {t("no")}
                  </label>
                </div>
                <ErrorMessage
                  name="materialConditions.decision"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {formData.submitExchangeDetails.materialConditions.decision ===
                "yes" && (
                <div className="mt-4">
                  <label
                    htmlFor="percentage"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t("DepositPercentage (%)")}
                  </label>
                  <Field name="materialConditions.depositPayment.percentage">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="number"
                        className="w-full p-2 border rounded-md"
                        min={0}
                        max={100}
                        value={
                          formData.expectedRequirementsDetails
                            .materialConditions.depositPayment.percentage || ""
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = event.target.value;

                          // Update FormContext
                          setFormData((prevData) => ({
                            ...prevData,
                            expectedRequirementsDetails: {
                              ...prevData.expectedRequirementsDetails,
                              materialConditions: {
                                ...prevData.expectedRequirementsDetails
                                  .materialConditions,
                                depositPayment: {
                                  ...prevData.expectedRequirementsDetails
                                    .materialConditions.depositPayment,
                                  percentage: value,
                                },
                              },
                            },
                          }));

                          // Update Formik state
                          setFieldValue(
                            "materialConditions.depositPayment.percentage",
                            value
                          );
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="materialConditions.depositPayment.percentage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Other Contingent Coverage Required */}
          <div className="font-semibold">
            <label htmlFor="materialConditions.otherContingentCoverageRequired">
              {t(`Other Contingent Coverage Required`)}
            </label>
            <Field name="materialConditions.otherContingentCoverageRequired">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={
                    formData.expectedRequirementsDetails.materialConditions
                      .otherContingentCoverageRequired || ""
                  }
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;

                    // Update FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        materialConditions: {
                          ...prevData.expectedRequirementsDetails
                            .materialConditions,
                          otherContingentCoverageRequired: value,
                        },
                      },
                    }));

                    // Update Formik state
                    field.onChange(event);
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="materialConditions.otherContingentCoverageRequired"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Guarantees */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("MoneyBackGuarantee")}
            </label>
            <div role="group" className="flex gap-4">
              <label>
                <Field name="guarantees.moneyBackGuarantee">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="radio"
                      value="yes"
                      checked={
                        formData.expectedRequirementsDetails.guarantees
                          .moneyBackGuarantee === "yes"
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;

                        // Update FormContext
                        setFormData((prevData) => ({
                          ...prevData,
                          expectedRequirementsDetails: {
                            ...prevData.expectedRequirementsDetails,
                            guarantees: {
                              ...prevData.expectedRequirementsDetails
                                .guarantees,
                              moneyBackGuarantee: value,
                            },
                          },
                        }));

                        // Update Formik state
                        field.onChange(event);
                      }}
                    />
                  )}
                </Field>
                {t("yes")}
              </label>
              <label>
                <Field name="guarantees.moneyBackGuarantee">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="radio"
                      value="no"
                      checked={
                        formData.expectedRequirementsDetails.guarantees
                          .moneyBackGuarantee === "no"
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;

                        // Update FormContext
                        setFormData((prevData) => ({
                          ...prevData,
                          expectedRequirementsDetails: {
                            ...prevData.expectedRequirementsDetails,
                            guarantees: {
                              ...prevData.expectedRequirementsDetails
                                .guarantees,
                              moneyBackGuarantee: value,
                            },
                          },
                        }));

                        // Update Formik state
                        field.onChange(event);
                      }}
                    />
                  )}
                </Field>
                {t("no")}
              </label>
            </div>
            <ErrorMessage
              name="guarantees.moneyBackGuarantee"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("SatisfactionGuarantee")}
            </label>
            <div role="group" className="flex gap-4">
              <label>
                <Field name="guarantees.satisfactionGuarantee">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="radio"
                      value="yes"
                      checked={
                        formData.expectedRequirementsDetails.guarantees
                          .satisfactionGuarantee === "yes"
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;

                        // Update FormContext
                        setFormData((prevData) => ({
                          ...prevData,
                          expectedRequirementsDetails: {
                            ...prevData.expectedRequirementsDetails,
                            guarantees: {
                              ...prevData.expectedRequirementsDetails
                                .guarantees,
                              satisfactionGuarantee: value,
                            },
                          },
                        }));

                        // Update Formik state
                        field.onChange(event);
                      }}
                    />
                  )}
                </Field>
                {t("yes")}
              </label>
              <label>
                <Field name="guarantees.satisfactionGuarantee">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="radio"
                      value="no"
                      checked={
                        formData.expectedRequirementsDetails.guarantees
                          .satisfactionGuarantee === "no"
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const value = event.target.value;

                        // Update FormContext
                        setFormData((prevData) => ({
                          ...prevData,
                          expectedRequirementsDetails: {
                            ...prevData.expectedRequirementsDetails,
                            guarantees: {
                              ...prevData.expectedRequirementsDetails
                                .guarantees,
                              satisfactionGuarantee: value,
                            },
                          },
                        }));

                        // Update Formik state
                        field.onChange(event);
                      }}
                    />
                  )}
                </Field>
                {t("no")}
              </label>
            </div>
            <ErrorMessage
              name="guarantees.satisfactionGuarantee"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Payment Details */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("DesiredPaymentForm")}
            </label>
            <Field name="paymentDetails.desiredPaymentForm">
              {({ field }: FieldProps) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  value={
                    formData.expectedRequirementsDetails.paymentDetails
                      .desiredPaymentForm
                  } // Sync with FormContext
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;

                    // Update FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        paymentDetails: {
                          ...prevData.expectedRequirementsDetails
                            .paymentDetails,
                          desiredPaymentForm: value,
                        },
                      },
                    }));

                    // Update Formik state
                    field.onChange(event);
                  }}
                >
                  <option value="" disabled>
                    {t("Select Payment Form")}
                  </option>
                  <option value="exchange-sum">
                    {t("Exchange + or - Additional Sum")}
                  </option>
                  <option value="exchange-service">
                    {t("Exchange + or - Benefit or Service")}
                  </option>
                </select>
              )}
            </Field>
            <ErrorMessage
              name="paymentDetails.desiredPaymentForm"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t("DesiredPaymentType")}
            </label>
            <Field name="paymentDetails.desiredPaymentType">
              {({ field }: FieldProps) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  value={
                    formData.expectedRequirementsDetails.paymentDetails
                      .desiredPaymentType
                  } // Sync with FormContext
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;

                    // Update FormContext
                    setFormData((prevData) => ({
                      ...prevData,
                      expectedRequirementsDetails: {
                        ...prevData.expectedRequirementsDetails,
                        paymentDetails: {
                          ...prevData.expectedRequirementsDetails
                            .paymentDetails,
                          desiredPaymentType: value,
                        },
                      },
                    }));

                    // Update Formik state
                    field.onChange(event);
                  }}
                >
                  <option value="" disabled>
                    {t("Select Payment Type")}
                  </option>
                  <option value="hand-to-hand">{t("handToHand")}</option>
                  <option value="before-delivery">
                    {t("Exchange & Payment Before Delivery")}
                  </option>
                  <option value="after-delivery">
                    {t("Exchange & Payment After Delivery")}
                  </option>
                </select>
              )}
            </Field>
            <ErrorMessage
              name="paymentDetails.desiredPaymentType"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Delivery Conditions */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center mb-4">
              {t("DeliveryConditions")}
            </h2>

            {/* Pickup */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {t("Pickup")}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <Field name="deliveryConditions.pickup.allowed">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="radio"
                        value="yes"
                        checked={
                          formData.expectedRequirementsDetails
                            .deliveryConditions.pickup.allowed === "yes"
                        }
                        className="mr-2"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = event.target.value as "yes" | "no";
                          setFormData((prevData) => ({
                            ...prevData,
                            expectedRequirementsDetails: {
                              ...prevData.expectedRequirementsDetails,
                              deliveryConditions: {
                                ...prevData.expectedRequirementsDetails
                                  .deliveryConditions,
                                pickup: {
                                  ...prevData.expectedRequirementsDetails
                                    .deliveryConditions.pickup,
                                  allowed: value,
                                },
                              },
                            },
                          }));
                          field.onChange(event);
                        }}
                      />
                    )}
                  </Field>
                  {t("yes")}
                </label>

                <label className="flex items-center">
                  <Field name="deliveryConditions.pickup.allowed">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="radio"
                        value="no"
                        checked={
                          formData.expectedRequirementsDetails
                            .deliveryConditions.pickup.allowed === "no"
                        }
                        className="mr-2"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = event.target.value as "yes" | "no";
                          setFormData((prevData) => ({
                            ...prevData,
                            expectedRequirementsDetails: {
                              ...prevData.expectedRequirementsDetails,
                              deliveryConditions: {
                                ...prevData.expectedRequirementsDetails
                                  .deliveryConditions,
                                pickup: {
                                  ...prevData.expectedRequirementsDetails
                                    .deliveryConditions.pickup,
                                  allowed: value,
                                },
                              },
                            },
                          }));
                          field.onChange(event);
                        }}
                      />
                    )}
                  </Field>
                  {t("no")}
                </label>
              </div>
              <ErrorMessage
                name="deliveryConditions.pickup.allowed"
                component="div"
                className="text-red-500 text-sm"
              />

              {formData.expectedRequirementsDetails.deliveryConditions.pickup
                .allowed === "yes" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(["address", "country", "city", "campus"] as const).map(
                    (key) => (
                      <div key={key} className="mt-4">
                        <label
                          htmlFor={`deliveryConditions.pickup.details.${key}`}
                          className="block text-gray-700 font-semibold mb-1"
                        >
                          {t(key.charAt(0).toUpperCase() + key.slice(1))}{" "}
                          {/* Capitalized label */}
                        </label>
                        <Field
                          name={`deliveryConditions.pickup.details.${key}`}
                        >
                          {({ field }: { field: FieldInputProps<string> }) => (
                            <input
                              {...field}
                              id={`deliveryConditions.pickup.details.${key}`} // Add id for accessibility
                              type="text"
                              className="w-full p-2 border rounded-md"
                              value={
                                formData.expectedRequirementsDetails
                                  .deliveryConditions.pickup.details[key]
                              }
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const value = event.target.value;

                                // Update FormContext
                                setFormData((prevData) => ({
                                  ...prevData,
                                  expectedRequirementsDetails: {
                                    ...prevData.expectedRequirementsDetails,
                                    deliveryConditions: {
                                      ...prevData.expectedRequirementsDetails
                                        .deliveryConditions,
                                      pickup: {
                                        ...prevData.expectedRequirementsDetails
                                          .deliveryConditions.pickup,
                                        details: {
                                          ...prevData
                                            .expectedRequirementsDetails
                                            .deliveryConditions.pickup.details,
                                          [key]: value,
                                        },
                                      },
                                    },
                                  },
                                }));

                                // Update Formik state
                                field.onChange(event);
                              }}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name={`deliveryConditions.pickup.details.${key}`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Delivery */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {t("Delivery")}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <Field name="deliveryConditions.delivery.allowed">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="radio"
                        value="yes"
                        checked={
                          formData.expectedRequirementsDetails
                            .deliveryConditions.delivery.allowed === "yes"
                        }
                        className="mr-2"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = event.target.value as "yes" | "no";
                          setFormData((prevData) => ({
                            ...prevData,
                            expectedRequirementsDetails: {
                              ...prevData.expectedRequirementsDetails,
                              deliveryConditions: {
                                ...prevData.expectedRequirementsDetails
                                  .deliveryConditions,
                                delivery: {
                                  ...prevData.expectedRequirementsDetails
                                    .deliveryConditions.delivery,
                                  allowed: value,
                                },
                              },
                            },
                          }));
                          field.onChange(event);
                        }}
                      />
                    )}
                  </Field>
                  {t("yes")}
                </label>

                <label className="flex items-center">
                  <Field name="deliveryConditions.delivery.allowed">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="radio"
                        value="no"
                        checked={
                          formData.expectedRequirementsDetails
                            .deliveryConditions.delivery.allowed === "no"
                        }
                        className="mr-2"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = event.target.value as "yes" | "no";
                          setFormData((prevData) => ({
                            ...prevData,
                            expectedRequirementsDetails: {
                              ...prevData.expectedRequirementsDetails,
                              deliveryConditions: {
                                ...prevData.expectedRequirementsDetails
                                  .deliveryConditions,
                                delivery: {
                                  ...prevData.expectedRequirementsDetails
                                    .deliveryConditions.delivery,
                                  allowed: value,
                                },
                              },
                            },
                          }));
                          field.onChange(event);
                        }}
                      />
                    )}
                  </Field>
                  {t("no")}
                </label>
              </div>
              <ErrorMessage
                name="deliveryConditions.delivery.allowed"
                component="div"
                className="text-red-500 text-sm"
              />

              {formData.expectedRequirementsDetails.deliveryConditions.delivery
                .allowed === "yes" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(["cost", "country", "city"] as const).map((key) => (
                    <div key={key}>
                      <label className="block text-gray-700 mb-1">
                        {t(key.charAt(0).toUpperCase() + key.slice(1))}
                      </label>
                      <Field
                        name={`deliveryConditions.delivery.details.${key}`}
                      >
                        {({ field }: { field: FieldInputProps<string> }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={
                              formData.expectedRequirementsDetails
                                .deliveryConditions.delivery.details[key]
                            }
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const value = event.target.value;

                              // Update FormContext
                              setFormData((prevData) => ({
                                ...prevData,
                                expectedRequirementsDetails: {
                                  ...prevData.expectedRequirementsDetails,
                                  deliveryConditions: {
                                    ...prevData.expectedRequirementsDetails
                                      .deliveryConditions,
                                    delivery: {
                                      ...prevData.expectedRequirementsDetails
                                        .deliveryConditions.delivery,
                                      details: {
                                        ...prevData.expectedRequirementsDetails
                                          .deliveryConditions.delivery.details,
                                        [key]: value,
                                      },
                                    },
                                  },
                                },
                              }));

                              // Update Formik state
                              field.onChange(event);
                            }}
                          />
                        )}
                      </Field>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Geolocation */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-center mb-4">
              {t("Geolocation")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["campus", "country"] as const).map((key) => (
                <div key={key} className="mt-4">
                  {/* Label */}
                  <label
                    htmlFor={`geolocation.${key}`}
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t(key.charAt(0).toUpperCase() + key.slice(1))}{" "}
                    {/* Capitalized label */}
                  </label>
                  {/* Input Field */}
                  <Field name={`geolocation.${key}`}>
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <input
                        {...field}
                        id={`geolocation.${key}`} // Add id for accessibility
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={
                          formData.expectedRequirementsDetails.geolocation[
                            key
                          ] || "" // Ensure controlled value
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const value = event.target.value;

                          // Update FormContext
                          setFormData((prevData) => ({
                            ...prevData,
                            expectedRequirementsDetails: {
                              ...prevData.expectedRequirementsDetails,
                              geolocation: {
                                ...prevData.expectedRequirementsDetails
                                  .geolocation,
                                [key]: value,
                              },
                            },
                          }));

                          // Update Formik state
                          field.onChange(event);
                        }}
                      />
                    )}
                  </Field>
                  {/* Error Message */}
                  <ErrorMessage
                    name={`geolocation.${key}`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Other Special Conditions */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-center mb-4">
              {t("Other Special Conditions")}
            </h2>
            <div>
              <label
                htmlFor="otherSpecialConditions.additionalDescription"
                className="block text-gray-700 font-semibold mb-1"
              >
                {t("Additional Description of the payment or Delivery Method")}
              </label>
              <Field name="otherSpecialConditions.additionalDescription">
                {({
                  field, // Access Formik field props
                }: {
                  field: FieldInputProps<string>;
                }) => (
                  <textarea
                    {...field} // Bind Formik field props
                    id="otherSpecialConditions.additionalDescription"
                    rows={4}
                    className="w-full p-3 border rounded-md resize-none"
                    onChange={(
                      event: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
                      const value = event.target.value;

                      // Update FormContext
                      setFormData((prevData) => ({
                        ...prevData,
                        expectedRequirementsDetails: {
                          ...prevData.expectedRequirementsDetails,
                          otherSpecialConditions: {
                            ...prevData.expectedRequirementsDetails
                              .otherSpecialConditions,
                            additionalDescription: value,
                          },
                        },
                      }));

                      // Update Formik state
                      field.onChange(event);
                    }}
                    value={
                      formData.expectedRequirementsDetails
                        .otherSpecialConditions.additionalDescription
                    } // Sync with FormContext
                  />
                )}
              </Field>
              <ErrorMessage
                name="otherSpecialConditions.additionalDescription"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <label
              htmlFor="fileUpload"
              className="block text-gray-700 font-semibold mb-1"
            >
              {t("uploadFile")}
            </label>
            <div className="flex items-center space-x-6">
              <label
                htmlFor="fileUpload"
                className="flex items-center justify-center w-full p-6 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
              >
                <Image
                  src={previewFileIcon || "/documents.png"} // Dynamic preview based on selected file or default
                  alt={t("uploadIconAlt")}
                  width={50}
                  height={50}
                  className="mr-2"
                />
                <span className="text-gray-600 text-base">
                  {selectedFileName || t("chooseFile")}
                </span>
              </label>
              <Field name="otherSpecialConditions.uploadedFiles">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<ProductForProductFormContextType>;
                  form: FormikProps<ProductForProductFormContextType>;
                }) => (
                  <>
                    <input
                      id="fileUpload"
                      name={field.name}
                      type="file"
                      className="hidden"
                      accept=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          console.log("Selected file type:", file.type);
                          console.log("Selected file name:", file.name);

                          // Update Formik field value
                          form.setFieldValue(
                            "otherSpecialConditions.uploadedFiles",
                            [file] // Replace with the selected file
                          );

                          // Update FormContext value
                          setFormData((prevData) => ({
                            ...prevData,
                            expectedRequirementsDetails: {
                              ...prevData.expectedRequirementsDetails,
                              otherSpecialConditions: {
                                ...prevData.expectedRequirementsDetails
                                  .otherSpecialConditions,
                                uploadedFiles: [file], // Replace with the selected file
                              },
                            },
                          }));

                          // Update preview
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPreviewFileIcon(
                              file.type === "application/pdf"
                                ? "/pdf.png"
                                : ["doc", "docx"].includes(
                                    file.name.split(".").pop()!.toLowerCase()
                                  )
                                ? "/word.png"
                                : "/documents.png"
                            );
                            setSelectedFileName(file.name);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </>
                )}
              </Field>
            </div>
            <ErrorMessage
              name="otherSpecialConditions.uploadedFiles"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => console.log("Submit button clicked")}
            >
              Submit
            </button>
          </div>
          {/* Debugging Section */}
          {/* <pre>{JSON.stringify(errors, null, 2)}</pre>
          <p>Form is {isValid ? "valid" : "invalid"}</p> */}
        </Form>
      )}
    </Formik>
  );
};

export default ExpectedrequirementsForm;
