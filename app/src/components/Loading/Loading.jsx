import "./Loading.css";

export default function Loading() {
  return (
    <div className="noti-section d__flex loading">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
