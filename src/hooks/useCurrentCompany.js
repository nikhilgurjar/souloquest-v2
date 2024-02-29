"use client";
import { get_profile } from "@/actions/companyAuth";
import useApi from "@/actions/useCompanyApi";
import { useSnackbar } from "@/components/snackbar";
import { setTourCompany } from "@/redux/slices/tourCompany";
import { useDispatch, useSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useCurrentCompany = () => {
  const company = useSelector((state) => state.tourCompany.tourCompany);

  const dispatch = useDispatch();
  const api = useApi();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await api.get("getprofile");
        dispatch(setTourCompany({ tourCompany: response.tourCompany }));
      } catch (error) {
        console.error(error);
        // handle error
      } finally {
        setLoading(false);
      }
    };

    if (!company) {
      fetchCompany();
    }
  }, [company]);

  return { company, loading };
};
