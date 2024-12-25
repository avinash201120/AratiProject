"use client";

import React, { useState } from "react";

const CreateExchange = () => {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [exchangeFor, setExchangeFor] = useState("");
  const [type, setType] = useState<
    "exchange" | "classic_sale" | "auction" | "donation"
  >("exchange");
  const [tradeType, setTradeType] = useState<
    | "product_for_product"
    | "product_for_service"
    | "service_for_service"
    | "service_for_product"
  >("product_for_product");
  const [startingPrice, setStartingPrice] = useState<number | null>(null);
  // const [isAuction, setIsAuction] = useState(false);
  const [intendedRecipient, setIntendedRecipient] = useState<
    "student" | "association" | "any"
  >("any");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the payload based on the transaction type
    const payload: any = { product, description, type, isPublic: true };

    if (type === "exchange") {
      payload.exchangeFor = exchangeFor;
      payload.tradeDetails = { tradeType };
    } else if (type === "classic_sale") {
      payload.saleDetails = { startingPrice, isAuction: false };
    } else if (type === "auction") {
      payload.saleDetails = { startingPrice, isAuction: true };
    } else if (type === "donation") {
      payload.donationDetails = { intendedRecipient };
    }

    try {
      const response = await fetch("/api/student/exchanges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create exchange");
      }

      const data = await response.json();
      alert(`Exchange created: ${data.product}`);
      resetForm();
    } catch (error) {
      console.error("Error creating exchange:", error);
      alert("Error creating exchange. Please try again.");
    }
  };

  const resetForm = () => {
    setProduct("");
    setDescription("");
    setExchangeFor("");
    setType("exchange");
    setTradeType("product_for_product");
    setStartingPrice(null);
    // setIsAuction(false);
    setIntendedRecipient("any");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mt-4">
      <h2 className="text-xl font-semibold">Create New Exchange</h2>

      {/* Product Field */}
      <div className="mt-2">
        <label className="block text-sm font-medium">Product</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
      </div>

      {/* Description Field */}
      <div className="mt-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
      </div>

      {/* Transaction Type */}
      <div className="mt-2">
        <label className="block text-sm font-medium">Transaction Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="border w-full p-2 rounded"
          required
        >
          <option value="exchange">Exchange</option>
          <option value="classic_sale">Classic Sale</option>
          <option value="auction">Auction</option>
          <option value="donation">Donation</option>
        </select>
      </div>

      {/* Conditional Fields */}
      {type === "exchange" && (
        <>
          <div className="mt-2">
            <label className="block text-sm font-medium">Exchange For</label>
            <input
              type="text"
              value={exchangeFor}
              onChange={(e) => setExchangeFor(e.target.value)}
              className="border w-full p-2 rounded"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium">Trade Type</label>
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value as any)}
              className="border w-full p-2 rounded"
            >
              <option value="product_for_product">Product for Product</option>
              <option value="product_for_service">Product for Service</option>
              <option value="service_for_service">Service for Service</option>
              <option value="service_for_product">Service for Product</option>
            </select>
          </div>
        </>
      )}

      {type === "classic_sale" && (
        <div className="mt-2">
          <label className="block text-sm font-medium">Starting Price</label>
          <input
            type="number"
            value={startingPrice ?? ""}
            onChange={(e) => setStartingPrice(parseFloat(e.target.value))}
            className="border w-full p-2 rounded"
          />
        </div>
      )}

      {type === "auction" && (
        <div className="mt-2">
          <label className="block text-sm font-medium">
            Starting Bid Price
          </label>
          <input
            type="number"
            value={startingPrice ?? ""}
            onChange={(e) => setStartingPrice(parseFloat(e.target.value))}
            className="border w-full p-2 rounded"
          />
        </div>
      )}

      {type === "donation" && (
        <div className="mt-2">
          <label className="block text-sm font-medium">
            Intended Recipient
          </label>
          <select
            value={intendedRecipient}
            onChange={(e) => setIntendedRecipient(e.target.value as any)}
            className="border w-full p-2 rounded"
          >
            <option value="student">Student</option>
            <option value="association">Association</option>
            <option value="any">Any</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateExchange;
