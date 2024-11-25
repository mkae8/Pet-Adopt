"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Smartphone, QrCode } from "lucide-react";

const donationAmounts = [10, 25, 50, 100];

export default function DonationSection() {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(donationAmounts[0]);

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(0);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
          <p className="text-xl text-gray-600">
            Your donation helps us care for and find homes for pets in need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Tabs defaultValue="bank" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="bank">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Bank Transfer
                  </TabsTrigger>
                  <TabsTrigger value="app">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Bank App
                  </TabsTrigger>
                  <TabsTrigger value="qr">
                    <QrCode className="mr-2 h-4 w-4" />
                    QR Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bank">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          onClick={() => handleAmountClick(amount)}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-amount">Custom Amount</Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-details">Bank Details</Label>
                      <Input
                        id="bank-details"
                        value="Pet Adoption Center - Account: 1234567890"
                        readOnly
                      />
                    </div>
                    <Button className="w-full">Proceed to Donate</Button>
                  </div>
                </TabsContent>

                <TabsContent value="app">
                  <div className="space-y-4">
                    <p className="text-center text-gray-600">
                      Open your bank app and use the following details to make a
                      donation:
                    </p>
                    <div className="space-y-2">
                      <Label>Recipient Name</Label>
                      <Input value="Pet Adoption Center" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <Input value="1234567890" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Reference</Label>
                      <Input value="PET-DONATION" readOnly />
                    </div>
                    <Button className="w-full">Open Bank App</Button>
                  </div>
                </TabsContent>

                <TabsContent value="qr">
                  <div className="space-y-4 text-center">
                    <p className="text-gray-600">
                      Scan the QR code below with your bank app to make a
                      donation:
                    </p>
                    <div className="flex justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Donation QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Unable to scan? Use the bank transfer option for manual
                      entry.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
