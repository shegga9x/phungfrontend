"use client";

import React, { useEffect, useState } from "react";
import { useAuthGuard } from "@/lib/auth/use-auth";
import Container from "@/components/container";
import { Button, TextInput } from "@mantine/core";
import { getVNPayUrl } from "@/lib/http";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentUserState } from "@/atoms";
import Loading from "@/components/loading";

export interface CreateOption {
  value: string;
  label: string;
}

export default function ProfilePage() {
  const { user } = useAuthGuard({ middleware: "auth" });
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (user) {
      setBalance(user.balance);
      setLoading(false);
    }
  }, [user]);
  async function handleBuyClick() {
    setLoading(true);
    const response = await getVNPayUrl(user?.id, 250000000);
    if (response.content && typeof response.content === 'string') {
      router.push(response.content);
    } else {
      enqueueSnackbar('Error: Invalid URL', { variant: 'error' });
      setLoading(false);
    }
    setLoading(false)
  }
  if (loading) {
    return <Loading></Loading>
  }
  return (
    <Container size="sm" className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <label htmlFor="balance" className="text-lg font-medium">Balance:</label>
          <TextInput id="balance" value={`$${balance}`} className="w-40 text-center" readOnly />
        </div>
        <Button className="mt-4" onClick={handleBuyClick}>Deposit</Button>
      </div>
    </Container>

  );

}
