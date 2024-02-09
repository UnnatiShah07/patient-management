import { FC } from "react";
import { Link } from "react-router-dom";
import { SiReplit } from "react-icons/si";
import { RxCodesandboxLogo } from "react-icons/rx";

export const Header: FC = () => {
  return (
    <div className="header">
      <h3>Patient Management</h3>
      <div className="links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/patient">
          Patient
        </Link>
        <Link className="link" to="/ward">
          Ward
        </Link>
        {/* <a href="" target="_blank" rel="noreferrer" className="code-link">
          <RxCodesandboxLogo />
        </a> */}
        <a href="https://replit.com/@UnnatiShah07/Assignment-21-PatientManagement" target="_blank" rel="noreferrer" className="code-link">
          <SiReplit />
        </a>
      </div>
    </div>
  );
};
