import { ReactNode } from "react";

export interface BaseModalProps {
  onClose: () => void;
}

export interface SignUpModalProps extends BaseModalProps {
  uid: string;
  googleId: string;
}

export interface LogoutModalProps extends BaseModalProps {}

export interface LoginModalProps extends BaseModalProps {}

export type ModalProps = SignUpModalProps | LogoutModalProps | LoginModalProps;

export type ModalType = "login" | "logout" | "register";

export type ModalComponent<P extends BaseModalProps> = React.ComponentType<P>;

export interface Modal<P extends BaseModalProps = BaseModalProps> {
  Component: ModalComponent<P>;
  props?: Omit<P, keyof BaseModalProps>;
}

export type ModalsState = {
  [K in ModalType]?: Modal<ModalProps>;
};
