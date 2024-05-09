import { ExpiredError, State, WalletViewProps } from "@cosmos-kit/core";
import {
  ConnectModalHead,
  ConnectModalQRCode,
  QRCodeStatus,
} from "@interchain-ui/react";

import { ModalViewImpl } from "./config";

export function QRCodeView({
  onClose,
  onReturn,
  wallet,
}: WalletViewProps): ModalViewImpl {
  const {
    walletInfo: { prettyName },
  } = wallet;

  const { data, state, message } = wallet.qrUrl ?? {};

  function getParts() {
    let desc: string | undefined = `Open ${prettyName} App to Scan`;
    let errorTitle: string | undefined, errorDesc: string | undefined;

    if (state === "Error") {
      desc = undefined;
      if (message === ExpiredError.message) {
        errorTitle = "QRCode Expired";
        errorDesc = "Click to refresh.";
      } else {
        errorTitle = "QRCode Error";
        errorDesc = message ?? "An unknown error occurred.";
      }
    }

    let status: QRCodeStatus;

    switch (state) {
      case State.Pending:
        status = "Pending";
        break;
      case State.Done:
        status = "Done";
        break;
      case State.Error:
        if (message === ExpiredError.message) {
          status = "Expired";
        } else {
          status = "Error";
        }
        break;
      default:
        status = "Error";
    }

    return { desc, errorTitle, errorDesc, status };
  }

  const { desc, errorTitle, errorDesc, status } = getParts();

  const onRefresh = () => {
    wallet.connect(false);
  };

  const modalHead = (
    <ConnectModalHead
      title={prettyName}
      hasBackButton={true}
      onClose={onClose}
      onBack={onReturn}
    />
  );

  const modalContent = (
    <ConnectModalQRCode
      status={status}
      link={data || ""}
      description={desc ?? ""}
      errorTitle={errorTitle}
      errorDesc={errorDesc}
      onRefresh={onRefresh}
    />
  );

  return { head: modalHead, content: modalContent };
}
