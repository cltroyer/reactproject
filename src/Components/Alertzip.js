import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AlertContext } from "./WeatherContext";

function Alertzip() {
  const [show, setShow] = useContext(AlertContext);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>That zip is not valid. Please try again</p>
      </Alert>
    );
  } else {
    return "";
  }
}

export default Alertzip;
