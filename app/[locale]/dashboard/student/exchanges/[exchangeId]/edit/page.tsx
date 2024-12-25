"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditExchange = () => {
  const { exchangeId } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    product: "",
    description: "",
    exchangeFor: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const response = await fetch(`/api/student/exchanges/${exchangeId}`);
        const data = await response.json();
        setFormData({
          product: data.product,
          description: data.description,
          exchangeFor: data.exchangeFor,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange:", error);
      }
    };

    fetchExchange();
  }, [exchangeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/student/exchanges/${exchangeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Exchange updated successfully!");
        router.push("/dashboard/student/exchanges");
      } else {
        const errorData = await response.json();
        alert(`Error updating exchange: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating exchange:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Exchange</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product" className="block font-medium">
            Product
          </label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="exchangeFor" className="block font-medium">
            Exchange For
          </label>
          <input
            type="text"
            id="exchangeFor"
            name="exchangeFor"
            value={formData.exchangeFor}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditExchange;
