"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, QrCode } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

export type DonateModelType = {
  _id: string;
  userId: string;
  isPaid: boolean;
  amount: string;
};

const donationAmounts = ["10000", "25000", "50000", "100000"];

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <img
        src="/running.gif"
        alt="Loading..."
        className="w-[150px] h-[150px]"
      />
    </div>
  );
};

export default function DonationSection() {
  const [mode, setMode] = useState("bank");
  const [selectedAmount, setSelectedAmount] = useState(donationAmounts[0]);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const user = useUser();

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(e.target.value);
  };

  const generateQR = async (donationId: string) => {
    const response = await axios.post(
      "https://qpaymock.onrender.com/generate-qr",
      { url: `${process.env.BACKEND_URL}/donation/update/${donationId}` }
    );
    setQrCode(response.data);
  };

  const handleCreateDonation = async () => {
    if (!user.isSignedIn) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to make a donation.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<DonateModelType>(
        `${process.env.BACKEND_URL}/donation/create`,
        {
          id: user.user?.id,
          amount: selectedAmount,
        }
      );

      await generateQR(response.data._id);
      setMode("qr");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create donation. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4"></h2>
          <p className="text-xl text-gray-600">
            Таны хандив тусламж хэрэгтэй тэжээвэр амьтдыг халамжилж, гэр олоход
            тусалдаг.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Tabs defaultValue="bank" className="w-full" value={mode}>
                <TabsList className="grid w-full grid-cols-2 mb-6 ">
                  <TabsTrigger
                    value="bank"
                    disabled={mode === "qr"}
                    className="text-sm font-bold"
                  >
                    <CreditCard className="mr-2 h-4 w-4 " />
                    Шилжүүлэг
                  </TabsTrigger>

                  <TabsTrigger
                    value="qr"
                    disabled={mode === "bank"}
                    className="text-sm font-bold"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    QR Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bank">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4 ">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          onClick={() => handleAmountClick(amount)}
                        >
                          {amount}₮
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2 ">
                      <Label className="text-xl font-bold">
                        Захиалгат дүн{" "}
                      </Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Захиалгат дүн"
                        value={selectedAmount}
                        onChange={handleCustomAmountChange}
                      />
                    </div>

                    <Button
                      onClick={handleCreateDonation}
                      className="w-full text-xl font-bold"
                    >
                      Үргэлжлүүлэн хандивлах
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="qr">
                  <div className="space-y-4 text-center">
                    <p className="text-gray-600 text-xl font-bold">
                      Хандив хийхийн тулд доорх QR кодыг өөрийн утасны camera
                      -аар уншина уу.
                    </p>
                    <div className="flex justify-center">
                      <img
                        src={qrCode as string}
                        alt="Donation QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <p className=" text-gray-500 text-xl font-bold">
                      Хэрэв болсон бол ямар нэгэн хөшөө болж хувьраад хүлээнэ
                      үү.
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
