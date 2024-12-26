"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { isValidToken } from "../utils";
import { logout } from "@/redux/reducers/auth/authSlice";
import { paths } from "@/layouts/paths";
import { SplashScreen } from "@/components/loader/splash-screen";

const loginPaths: Record<string, string> = {
  login: paths.signin,
};

interface IAuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: FC<IAuthGuardProps> = ({ children }) => {
  const { authLoading } = useAppSelector((state) => state.auth);
  return (
    <>{authLoading ? <SplashScreen /> : <Container>{children}</Container>}</>
    // <Container>{children}</Container>
  );
};

function Container({ children }: IAuthGuardProps) {
  // const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  let accessToken: string | null = null;

  if (typeof window === "object") {
    accessToken = localStorage?.getItem("accessToken");
  }

  const dispatch = useAppDispatch();

  // const check = useCallback(() => {
  //   if (!isAuthenticated) {
  //     if (accessToken) {
  //       if (!isValidToken(accessToken)) {
  //         dispatch(logout());
  //       }
  //     }
  //     const searchParams = new URLSearchParams({
  //       returnTo: window.location.pathname,
  //     }).toString();

  //     const loginPath = loginPaths.login;

  //     const href = `${loginPath}?${searchParams}`;
  //     router.replace(href);
  //   } else {
  //     setChecked(true);
  //   }
  // }, [isAuthenticated, accessToken, router, dispatch]);

  const check = useCallback(() => {
    if (accessToken && isValidToken(accessToken)) {
      // Token is valid, user is authenticated
      setChecked(true);
    } else {
      // Token is not valid or missing, redirect to login
      dispatch(logout());
      const searchParams = new URLSearchParams({
        returnTo: window.location.href,
      }).toString();
      const loginPath = loginPaths.login;
      const href = `${loginPath}?${searchParams}`;
      router.replace(href);
    }
  }, [accessToken, router, dispatch]);

  useEffect(() => {
    check();
  });

  // useEffect(() => {
  //   if (!checked) {
  //     check();
  //   }
  // }, [checked, check]);

  if (!checked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
