import { Box, Modal, Typography } from "@mui/material";

type PrivacyConsentModalProps = {
  open: boolean;
  onClose: () => void;
  setAgree: () => void;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // 모바일
    sm: 400, // 600px 이상
    md: 500, // 900px 이상
  },
  maxWidth: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  color: "black",
  p: { xs: 2, sm: 4 }, // 패딩도 반응형으로
};

const PrivacyConsentModal = ({
  open,
  onClose,
  setAgree,
}: PrivacyConsentModalProps) => {
  const handleAgree = () => {
    setAgree();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="privacy-consent-modal-title"
      aria-describedby="privacy-consent-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="privacy-consent-modal-title"
          variant="h6"
          component="h2"
          mb={2}
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          개인정보 수집 및 이용 동의
        </Typography>
        <Typography id="privacy-consent-modal-description" sx={{ mb: 2 }}>
          회원가입 및 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.{" "}
          <br />
          <br />
          1. 수집 항목 이메일 아이디 비밀번호 이름 <br />
          2. 수집·이용 목적 회원가입 및 계정 관리 서비스 이용을 위한 사용자 식별{" "}
          <br />
          3. 보유 및 이용 기간 회원 탈퇴 시까지 (단, 관계 법령에 따라 보존할
          필요가 있는 경우 해당 법령에서 정한 기간 동안 보관됩니다) <br />
          4. 동의 거부 권리 및 불이익 이용자는 개인정보 수집·이용에 대한 동의를
          거부할 수 있으나, 동의를 거부할 경우 회원가입이 제한될 수 있습니다.
        </Typography>
        <div className="flex justify-end">
          <button
            onClick={handleAgree}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            동의합니다
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default PrivacyConsentModal;
