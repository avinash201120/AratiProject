"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function SearchSection() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* White Background Square with Light Border */}
      <div className="bg-white shadow-md rounded-large p-6 border border-gray-200">
        <div className="flex flex-wrap md:flex-nowrap items-end justify-between gap-4 mt-8">
          {/* Perimeter Section */}
          <Button className="bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-lg font-weight-bold font-italic img-thumbnail pr-3 text-capitalize display-3">
            <MapPin className="text-white" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <div className="flex-1">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Research
                </label>
                <Input
                  placeholder="Type here to search"
                  className="w-full inline-flex px-6 py-4 border border-gray-300 rounded-medium items-center justify-center"
                />
              </div>
              <label className="text-sm font-medium mb-2 block mt-4">
                Perimeter
              </label>
              <Select>
                <SelectTrigger className="w-full inline-flex px-6 py-4 border border-gray-300 rounded-medium items-center justify-center">
                  <SelectValue placeholder="Around me" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="around_me">Around me</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Type Section */}
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Search type
            </label>
            <Select>
              <SelectTrigger className="w-full inline-flex px-6 py-4 border border-gray-300 rounded-medium items-center justify-center">
                <SelectValue placeholder="What are you looking for?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="jobs">Jobs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Section */}
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              What are you looking for?
            </label>
            <Select>
              <SelectTrigger className="w-full inline-flex px-6 py-4 border border-gray-300 rounded-medium items-center justify-center">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="home_appliances">Home Appliances</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <Button className="bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-lg font-weight-bold font-italic img-thumbnail pr-3 text-capitalize display-3">
              <Search className="text-white text-3xl" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
