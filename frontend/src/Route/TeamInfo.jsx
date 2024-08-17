import { React, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./teaminfo.css";
import Hao from "../Assets/Hao.png";
import Di from "../Assets/Di.jpg";
import Hy from "../Assets/Hy.jpg";
import Khuong from "../Assets/Khuong.jpg";
import Aos from "aos";
import Facebook from "../Assets/facebook.png";
import FacebookButton from "../Components/FacebookButton";

function Teaminfo() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div id="TEAMPROFILE" className="landing-page-section">
        <div className="rise_section">
          <div className="rise_header">
            <h1 style={{ fontWeight: "800" }}>ABOUT US</h1>
            <hr />
          </div>
        </div>

        <div className="rise_paragraph">
          We are team TechTitans. Our team consists of 4 people who are To Gia
          Hy, Nguyen Nguyen Khuong, Doan Thien Di and Pham Viet Hao. Despite our
          differences in expertise, we share the same targets and goals in this
          project, which is to design an IoT-based system that optimizes waste
          collection routes, using sensors to measure bin fullness and an
          algorithm to find the most efficient paths for the waste-collecting
          trucks.
        </div>

        {/* <div className="rise_paragraph">
        In Vietnam, refuse trucks follow set routes to keep the city clean, including medical refuse trucks that incinerate waste at processing plants. However, these trips can be inefficient and contribute significantly to CO2 emissions, with trucks responsible for 80% of this pollution. To reduce unnecessary travel, we propose an IoT-based system using ultrasonic sensors to measure bin fullness and transmit data via a SIM module. This data is processed on our website, which uses a routing algorithm to determine optimal pickup routes, displayed through a user-friendly interface, helping drivers minimize travel time and environmental impact.
        </div> */}

        <div className="rise_member_section" data-aos="fade-right">
          <div className="rise_member">
            <div className="profile_picture">
              <img src={Hy} />
            </div>
            <div className="profile_name">
              <h5>Tô Gia Hy</h5>
            </div>
            <div className="profile_sid">
              <p>s3927539</p>
            </div>
            <div className="social_media">
              <a
                href="https://www.facebook.com/profile.php?id=100008408078047"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookButton />
              </a>
            </div>
          </div>

          <div className="rise_member">
            <div className="profile_picture">
              <img src={Khuong} />
            </div>
            <div className="profile_name">
              <h5>Nguyễn Nguyên Khương</h5>
            </div>
            <div className="profile_sid">
              <p>s3924577</p>
            </div>
            <div className="social_media">
              <a
                href="https://www.facebook.com/whitemirror1212"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookButton />
              </a>
            </div>
          </div>

          <div className="rise_member">
            <div className="profile_picture">
              <img src={Di} />
            </div>
            <div className="profile_name">
              <h5>Đoàn Thiên Di</h5>
            </div>
            <div className="profile_sid">
              <p>s3926977</p>
            </div>
            <div className="social_media">
              <a
                href="https://www.facebook.com/didoan322"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookButton />
              </a>
            </div>
          </div>

          <div className="rise_member">
            <div className="profile_picture">
              <img src={Hao} />
            </div>
            <div className="profile_name">
              <h5>Phạm Viết Hào</h5>
            </div>
            <div className="profile_sid">
              <p>s3891710</p>
            </div>
            <div className="social_media">
              <a
                href="https://www.facebook.com/profile.php?id=100004533015898"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookButton />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teaminfo;
