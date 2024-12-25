export interface ProductForProductFormContextType {
  formData: {
    submitExchangeDetails: {
      zoneOneBanner: File | null;
      title: string;
      images: (File | null)[];
      offerType: string;
      category: string;
      subcategory: string;
      featuredProductStatus: string;
      additionalDescription: string;
      startDate: Date | null;
      endDate: Date | null;
      formOfExchange: string;
      materialConditions: {
        estimatedValue: string;
        decision: string;
        depositPayment: { percentage: string };
        otherContingentCoverageRequired: string;
      };
      guarantees: { moneyBackGuarantee: string; satisfactionGuarantee: string };
      paymentDetails: {
        desiredPaymentForm: string;
        desiredPaymentType: string;
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
          details: { cost: string; country: string; city: string };
        };
      };
      geolocation: { campus: string; country: string };
      otherSpecialConditions: {
        additionalDescription: string;
        uploadedFiles: File[];
      };
      file: File | null;
    };
    expectedRequirementsDetails: {
      zoneOneBanner: File | null;
      title: string;
      images: (File | null)[];
      offerType: string;
      category: string;
      subcategory: string;
      featuredProductStatus: string;
      additionalDescription: string;
      startDate: Date | null;
      endDate: Date | null;
      formOfExchange: string;
      materialConditions: {
        estimatedValue: string;
        decision: string;
        depositPayment: { percentage: string };
        otherContingentCoverageRequired: string;
      };
      guarantees: { moneyBackGuarantee: string; satisfactionGuarantee: string };
      paymentDetails: {
        desiredPaymentForm: string;
        desiredPaymentType: string;
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
          details: { cost: string; country: string; city: string };
        };
      };
      geolocation: { campus: string; country: string };
      otherSpecialConditions: {
        additionalDescription: string;
        uploadedFiles: File[];
      };
      file: File | null;
    };
  };
}
