import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FieldInputProps,
  FormikProps,
  FormikHelpers,
} from "formik";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";

type SEDepositPayment =
  | { decision: "yes"; depositPayment: { percentage: number } } // When decision is "yes", percentage is required
  | { decision: "no" | ""; depositPayment: { percentage?: undefined } }; // When decision is "no" or "", percentage is not required

type FormOfExchange = "Exchange" | "Classic Sale" | "Auction" | "Donation" | "";

type SubmitExchangeDetails = {
  // Use the same type definition as in the parent
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
    formOfExchange: FormOfExchange;
    materialConditions: {
      estimatedValue: string;

      depositPayment: SEDepositPayment;
      otherContingentCoverageRequired: string;
    };
    guarantees: {
      moneyBackGuarantee: "yes" | "no" | "";
      satisfactionGuarantee: "yes" | "no" | "";
    };
    paymentDetails: {
      desiredPaymentForm: "exchange-sum" | "exchange-service" | "";
      desiredPaymentType:
        | "hand-to-hand"
        | "before-delivery"
        | "after-delivery"
        | "";
    };
    deliveryConditions: {
      pickup: {
        allowed: "yes" | "no" | "";
        details: {
          address: string;
          country: string;
          city: string;
          campus: string;
        };
      };
      delivery: {
        allowed: "yes" | "no" | "";
        costOption?: "yes" | "no" | "";
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

type SubmitExchangeFormProps = {
  initialValues: SubmitExchangeDetails;
  validationSchema: object;

  onSubmit: (
    values: SubmitExchangeDetails,
    actions: FormikHelpers<SubmitExchangeDetails>
  ) => void;
  setFormValues: Dispatch<SetStateAction<SubmitExchangeDetails>>;
};

const SubmitExchangeForm: React.FC<SubmitExchangeFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  setFormValues,
}) => {
  const t = useTranslations("form");
  const [previewZoneOneBanner, setPreviewZoneOneBanner] = useState<
    string | null
  >(null);

  const [previewImages, setPreviewImages] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // onSubmit={(values, actions) => {
      //   setFormValues(values); // Update parent form state
      //   onSubmit(values, actions); // Trigger parent onSubmit logic
      // }}
      onSubmit={(values, actions) => {
        console.log("Form Submitted (Child):", values); // Debug
        setFormValues((prev) => ({
          submitExchangeDetails: {
            ...prev.submitExchangeDetails,
            ...values.submitExchangeDetails,

            // ...prev, // Retain previous state
            // ...values, // Merge new values
          },
        }));
        onSubmit(values, actions);
      }}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className="m-5 space-y-6 p-4 md:p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto border border-gray-200">
          {/* Title of the Submit Exchange*/}
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">
              {t(`Submit An Exchange Offer`)}
            </h2>
            <p className="text-gray-600">
              {t(`FinanceYourProjectsOrExpensesWithYourUnusedServicesOrGoods!`)}
            </p>
          </div>
          {/* Zone 1 Insertion Banner */}
          <div className="text-center p-5">
            <h2 className="mb-5 text-lg font-bold">
              {t(`Zone 1 Insertion Banner Advertising`)}
            </h2>
            <label
              htmlFor="submitExchangeDetails.zoneOneBanner"
              className="inline-block cursor-pointer p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <Image
                src={previewZoneOneBanner || "/imagetoselect.png"}
                alt="Upload Banner"
                className="max-w-full h-auto mx-auto mb-2"
                width={100}
                height={100}
              />
              <p className="text-gray-600">{t(`Click to upload`)}</p>
            </label>
            <Field name="submitExchangeDetails.zoneOneBanner">
              {({ field }: FieldProps) => (
                <input
                  id="submitExchangeDetails.zoneOneBanner"
                  type="file"
                  name={field.name}
                  accept="image/*"
                  className="hidden"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0] || null;

                    // Update Formik state
                    setFieldValue("submitExchangeDetails.zoneOneBanner", file);

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
              name="submitExchangeDetails.zoneOneBanner"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>

          {/* Title Field */}
          <div>
            <label
              htmlFor="submitExchangeDetails.title"
              className="block font-semibold"
            >
              {t(`Title of the offer`)}
            </label>
            <Field
              id="submitExchangeDetails.title"
              name="submitExchangeDetails.title"
              placeholder="Enter title"
              className="w-full p-2 border rounded-md"
            />
            <ErrorMessage
              name="submitExchangeDetails.title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Offer Type Field */}
          <div>
            <label className="block font-semibold mb-2">
              {t(`What do you offer`)}
            </label>
            <div role="group" aria-labelledby="offerType">
              {/* Radio Button for "Good" */}
              <label className="inline-flex items-center mr-4">
                <Field
                  type="radio"
                  name="submitExchangeDetails.offerType"
                  value="Good"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{t(`Good`)}</span>
              </label>

              {/* Radio Button for "Service" */}
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="submitExchangeDetails.offerType"
                  value="Service"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{t(`Service`)}</span>
              </label>
            </div>

            {/* Validation Error Message */}
            <ErrorMessage
              name="submitExchangeDetails.offerType"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Category and SubCategory Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Category`)}
              </label>
              <Field
                as="select"
                name="submitExchangeDetails.category"
                className="w-full p-2 border rounded-md"
                value={values.submitExchangeDetails.category}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedValue = event.target.value;
                  setFieldValue(
                    "submitExchangeDetails.category",
                    selectedValue
                  );
                }}
              >
                <option value="" disabled>
                  {t(`Select Category`)}
                </option>
                <option value="Electronics">{t(`Electronics`)}</option>
                <option value="Health">{t(`Health`)}</option>
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* SubCategory */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`SubCategory`)}
              </label>
              <Field
                as="select"
                name="subcategory"
                className="w-full p-2 border rounded-md"
                value={values.submitExchangeDetails.subcategory}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedValue = event.target.value;
                  setFieldValue(
                    "submitExchangeDetails.subcategory",
                    selectedValue
                  );
                }}
              >
                <option value="" disabled>
                  {t(`Select SubCategory`)}
                </option>
                <option value="Accessories">{t(`Accessories`)}</option>
                <option value="Health">{t(`Health`)}</option>
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.subcategory"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Featured Product Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {t(`Featured Product Status`)}
            </label>
            <Field name="submitExchangeDetails.featuredProductStatus">
              {({ form }: FieldProps) => (
                <select
                  name="submitExchangeDetails.featuredProductStatus"
                  className="w-full p-2 border rounded-md"
                  value={
                    form.values.submitExchangeDetails.featuredProductStatus ||
                    ""
                  }
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const selectedValue = event.target.value;
                    form.setFieldValue(
                      "submitExchangeDetails.featuredProductStatus",
                      selectedValue
                    );
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
              name="submitExchangeDetails.featuredProductStatus"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Additional Description Field */}
          <div>
            <label
              htmlFor="submitExchangeDetails.additionalDescription"
              className="block font-semibold"
            >
              {t(`Additional Description`)}
            </label>
            <Field
              as="textarea"
              id="submitExchangeDetails.additionalDescription"
              name="submitExchangeDetails.additionalDescription"
              placeholder="Add any additional details..."
              className="w-full p-2 border rounded-md"
              rows={4}
            />
            <ErrorMessage
              name="submitExchangeDetails.additionalDescription"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Images to Select */}

          <div className="mt-4">
            <label
              htmlFor="submitExchangeDetails.offer-images"
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
                    htmlFor={`submitExchangeDetails.offer-image-${index}`}
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-400 hover:bg-gray-50"
                  >
                    <Image
                      src={previewImages[index] || "/imagetoselect.png"}
                      alt="Select Image"
                      className="object-cover w-20 h-20 rounded-md"
                      width={100}
                      height={100}
                    />
                    <span className="text-sm text-gray-500">
                      {t(`Select Image`)}
                    </span>
                  </label>
                  <Field name={`submitExchangeDetails.images[${index}]`}>
                    {({
                      form,
                    }: {
                      form: FormikProps<SubmitExchangeFormProps>;
                    }) => (
                      <input
                        type="file"
                        id={`submitExchangeDetails.offer-image-${index}`}
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0] || undefined;

                          // Update Formik state
                          form.setFieldValue(
                            `submitExchangeDetails.images[${index}]`,
                            file
                          );

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
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>
            {/* Error message for the images array */}
            <ErrorMessage
              name="submitExchangeDetails.images"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </div>

          {/* Offer Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Offer Start Date`)}
              </label>
              <Field name="submitExchangeDetails.startDate">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.startDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Offer End Date`)}
              </label>
              <Field name="submitExchangeDetails.endDate">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.endDate"
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
            <Field name="submitExchangeDetails.formOfExchange">
              {({ field }: FieldProps) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  value={values.submitExchangeDetails.formOfExchange || ""}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = event.target.value;

                    // Update Formik state
                    setFieldValue(
                      "submitExchangeDetails.formOfExchange",
                      value
                    );
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
              name="submitExchangeDetails.formOfExchange"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* material conditions */}
          <div>
            <h3 className="text-lg font-bold text-center">
              {t(`Material conditions of the exchange`)}
            </h3>

            {/* Estimated Value */}
            <div>
              <label className="font-semibold text-gray-700">
                {t(`Estimated value of the exchange`)}
              </label>
              <Field name="submitExchangeDetails.materialConditions.estimatedValue">
                {({ field }: FieldProps) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter value"
                  />
                )}
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.materialConditions.estimatedValue"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Decision: Radio Buttons */}
            <div>
              <label className="block text-gray-700 mb-1">
                {t(`Deposit Payment for Booking`)}
              </label>
              <div role="group" className="flex gap-4">
                <label>
                  <Field
                    type="radio"
                    name="submitExchangeDetails.materialConditions.depositPayment.decision"
                    value="yes"
                  />{" "}
                  {t(`Yes`)}
                </label>
                <label>
                  <Field
                    type="radio"
                    name="submitExchangeDetails.materialConditions.depositPayment.decision"
                    value="no"
                  />{" "}
                  {t(`No`)}
                </label>
              </div>
              <ErrorMessage
                name="submitExchangeDetails.materialConditions.depositPayment.decision"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Deposit Percentage (Conditional Field) */}
            {values.submitExchangeDetails.materialConditions.depositPayment
              .decision === "yes" && (
              <div>
                <label className="block text-gray-700 mb-1">
                  {t(`Deposit Percentage (%)`)}
                </label>
                <Field name="submitExchangeDetails.materialConditions.depositPayment.percentage">
                  {({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="number"
                      min={0}
                      max={100}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter percentage"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="submitExchangeDetails.materialConditions.depositPayment.percentage"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            )}
          </div>
          {/* Other Contingent Coverage Required */}
          <div className="font-semibold mt-4">
            <label htmlFor="submitExchangeDetails.materialConditions.otherContingentCoverageRequired">
              {t(`Other Contingent Coverage Required`)}
            </label>
            <Field name="submitExchangeDetails.materialConditions.otherContingentCoverageRequired">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Specify other contingent coverage"
                />
              )}
            </Field>
            <ErrorMessage
              name="submitExchangeDetails.materialConditions.otherContingentCoverageRequired"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {/* Guarantees */}
          <div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Money Back Guarantee`)}
              </label>
              <div role="group" className="flex gap-4">
                <label>
                  <Field
                    type="radio"
                    name="submitExchangeDetails.guarantees.moneyBackGuarantee"
                    value="yes"
                  />
                  {t(`Yes`)}
                </label>
                <label>
                  <Field
                    type="radio"
                    name="submitExchangeDetails.guarantees.moneyBackGuarantee"
                    value="no"
                  />
                  {t(`No`)}
                </label>
              </div>
              <ErrorMessage
                name="submitExchangeDetails.guarantees.moneyBackGuarantee"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Satisfaction Guarantee`)}
              </label>
              <div role="group" className="flex gap-4">
                <label>
                  <Field
                    type="radio"
                    name="submitExchangeDetails.guarantees.satisfactionGuarantee"
                    value="yes"
                  />
                  {t(`Yes`)}
                </label>
                <label>
                  <Field
                    type="radio"
                    name="submitExchangeDetails.guarantees.satisfactionGuarantee"
                    value="no"
                  />
                  {t(`No`)}
                </label>
              </div>
              <ErrorMessage
                name="submitExchangeDetails.guarantees.satisfactionGuarantee"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Desired Payment Form */}
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Desired Payment Form`)}
              </label>
              <Field name="submitExchangeDetails.paymentDetails.desiredPaymentForm">
                {({ field }: FieldProps) => (
                  <select
                    {...field}
                    className="w-full p-2 border rounded-md focus:outline-blue-500"
                  >
                    <option value="" disabled>
                      {t(`Select Payment Form`)}
                    </option>
                    <option value="exchange-sum">
                      {t(`Exchange + or - Additional Sum`)}
                    </option>
                    <option value="exchange-service">
                      {t(`Exchange + or - Benefit or Service`)}
                    </option>
                  </select>
                )}
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.paymentDetails.desiredPaymentForm"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Desired Payment Type */}
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Desired Payment Type`)}
              </label>
              <Field name="submitExchangeDetails.paymentDetails.desiredPaymentType">
                {({ field }: FieldProps) => (
                  <select
                    {...field}
                    className="w-full p-2 border rounded-md focus:outline-blue-500"
                  >
                    <option value="" disabled>
                      {t(`Select Payment Type`)}
                    </option>
                    <option value="hand-to-hand">{t(`Hand to Hand`)}</option>
                    <option value="before-delivery">
                      {t(`Exchange & Payment Before Delivery`)}
                    </option>
                    <option value="after-delivery">
                      {t(`Exchange & Payment After Delivery`)}
                    </option>
                  </select>
                )}
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.paymentDetails.desiredPaymentType"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-center mb-4">
              {t(`Delivery Conditions`)}
            </h2>

            {/* Pickup */}

            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">
                {t(`Pickup`)}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="submitExchangeDetails.deliveryConditions.pickup.allowed"
                    value="yes"
                  />
                  <span className="ml-2">{t(`Yes`)}</span>
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="submitExchangeDetails.deliveryConditions.pickup.allowed"
                    value="no"
                  />
                  <span className="ml-2">{t(`No`)}</span>
                </label>
              </div>
              <ErrorMessage
                name="submitExchangeDetails.deliveryConditions.pickup.allowed"
                component="div"
                className="text-red-500 text-sm"
              />

              {values.submitExchangeDetails.deliveryConditions.pickup
                .allowed === "yes" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(["address", "country", "city", "campus"] as const).map(
                    (key) => (
                      <div key={key}>
                        <label
                          htmlFor={`submitExchangeDetails.deliveryConditions.pickup.details.${key}`}
                          className="block text-gray-700 font-semibold mb-1"
                        >
                          {/* {key.charAt(0).toUpperCase() + key.slice(1)} */}
                          {t(key.charAt(0).toUpperCase() + key.slice(1))}
                        </label>
                        <Field
                          name={`submitExchangeDetails.deliveryConditions.pickup.details.${key}`}
                          className="w-full p-2 border rounded-md"
                          placeholder={`Enter ${key}`}
                        />
                        <ErrorMessage
                          name={`submitExchangeDetails.deliveryConditions.pickup.details.${key}`}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Delivery */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {t(`Delivery`)}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="submitExchangeDetails.deliveryConditions.delivery.allowed"
                  value="yes"
                />
                <span className="ml-2">{t(`Yes`)}</span>
              </label>
              <label className="flex items-center">
                <Field
                  type="radio"
                  name="submitExchangeDetails.deliveryConditions.delivery.allowed"
                  value="no"
                />
                <span className="ml-2">{t(`No`)}</span>
              </label>
            </div>
            <ErrorMessage
              name="submitExchangeDetails.deliveryConditions.delivery.allowed"
              component="div"
              className="text-red-500 text-sm"
            />

            {values.submitExchangeDetails.deliveryConditions.delivery
              .allowed === "yes" && (
              <>
                {/* Delivery Cost Option */}
                <div className="mt-4">
                  <label className="block text-gray-700 font-semibold mb-1">
                    {t(`Is there a delivery cost?`)}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="submitExchangeDetails.deliveryConditions.delivery.costOption"
                        value="yes"
                      />
                      <span className="ml-2">{t(`Yes`)}</span>
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="submitExchangeDetails.deliveryConditions.delivery.costOption"
                        value="no"
                      />
                      <span className="ml-2">{t(`No`)}</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="submitExchangeDetails.deliveryConditions.delivery.costOption"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Delivery Amount */}
                {values.submitExchangeDetails.deliveryConditions.delivery
                  .costOption === "yes" && (
                  <div className="mt-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                      {t(`Delivery Cost Amount`)}
                    </label>
                    <Field
                      name="submitExchangeDetails.deliveryConditions.delivery.details.amount"
                      placeholder="Enter delivery cost amount"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="submitExchangeDetails.deliveryConditions.delivery.details.amount"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                {/* Delivery Regions */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t(`Country`)}
                    </label>
                    <Field
                      name="submitExchangeDetails.deliveryConditions.delivery.details.country"
                      placeholder="Enter country"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="submitExchangeDetails.deliveryConditions.delivery.details.country"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      {t(`City`)}
                    </label>
                    <Field
                      name="submitExchangeDetails.deliveryConditions.delivery.details.city"
                      placeholder="Enter city"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="submitExchangeDetails.deliveryConditions.delivery.details.city"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Geolocation */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-center mb-4">
              {t(`Geolocation`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["campus", "country"] as const).map((key) => (
                <div key={key} className="mt-4">
                  {/* Label */}
                  <label
                    htmlFor={`submitExchangeDetails.geolocation.${key}`}
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    {t(key.charAt(0).toUpperCase() + key.slice(1))}
                  </label>
                  {/* Input Field */}
                  <Field name={`submitExchangeDetails.geolocation.${key}`}>
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <input
                        {...field}
                        id={`submitExchangeDetails.geolocation.${key}`}
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder={`Enter ${key}`}
                      />
                    )}
                  </Field>
                  {/* Error Message */}
                  <ErrorMessage
                    name={`submitExchangeDetails.geolocation.${key}`}
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
              {t(`Other Special Conditions`)}
            </h2>

            {/* Additional Description */}
            <div>
              <label
                htmlFor="submitExchangeDetails.otherSpecialConditions.additionalDescription"
                className="block text-gray-700 font-semibold mb-1"
              >
                {t(`Additional Description of the payment or Delivery Method`)}
              </label>
              <Field name="submitExchangeDetails.otherSpecialConditions.additionalDescription">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <textarea
                    {...field}
                    id="submitExchangeDetails.otherSpecialConditions.additionalDescription"
                    rows={4}
                    className="w-full p-3 border rounded-md resize-none"
                    placeholder="Enter additional description..."
                  />
                )}
              </Field>
              <ErrorMessage
                name="submitExchangeDetails.otherSpecialConditions.additionalDescription"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* File Upload */}
            <div className="mt-4">
              <label
                htmlFor="submitExchangeDetails.otherSpecialConditions.uploadedFiles"
                className="block text-gray-700 font-semibold mb-1"
              >
                {t(`Upload File`)}
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="submitExchangeDetails.otherSpecialConditions.uploadedFiles"
                  className="flex items-center justify-center w-full p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <span className="text-gray-600 text-sm">
                    {values.submitExchangeDetails.otherSpecialConditions
                      .uploadedFiles.length > 0
                      ? values.submitExchangeDetails.otherSpecialConditions
                          .uploadedFiles[0].name
                      : "Choose a file"}
                  </span>
                </label>
                <Field name="submitExchangeDetails.otherSpecialConditions.uploadedFiles">
                  {({
                    form,
                  }: {
                    form: FormikProps<SubmitExchangeFormProps>;
                  }) => (
                    <input
                      id="submitExchangeDetails.otherSpecialConditions.uploadedFiles"
                      type="file"
                      className="hidden"
                      accept=".jpeg, .jpg, .png, .pdf, .doc, .docx"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          // Update Formik field value
                          form.setFieldValue(
                            "submitExchangeDetails.otherSpecialConditions.uploadedFiles",
                            [file]
                          );
                        }
                      }}
                    />
                  )}
                </Field>
              </div>
              <ErrorMessage
                name="submitExchangeDetails.otherSpecialConditions.uploadedFiles"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Debugging Info */}
          {/* <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">
              Debugging Information
            </h3>
            <p>Form Valid: {isValid ? "Yes" : "No"}</p>
            <p>Form Dirty: {dirty ? "Yes" : "No"}</p>

            <div className="mt-2">
              <h4 className="text-md font-semibold">Errors:</h4>
              <pre className="bg-white p-2 border rounded text-sm">
                {JSON.stringify(errors, null, 2)}
              </pre>
            </div>

            <div className="mt-2">
              <h4 className="text-md font-semibold">Touched Fields:</h4>
              <pre className="bg-white p-2 border rounded text-sm">
                {JSON.stringify(touched, null, 2)}
              </pre>
            </div>

            <div className="mt-2">
              <h4 className="text-md font-semibold">Form Values:</h4>
              <pre className="bg-white p-2 border rounded text-sm">
                {JSON.stringify(values, null, 2)}
              </pre>
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitExchangeForm;
