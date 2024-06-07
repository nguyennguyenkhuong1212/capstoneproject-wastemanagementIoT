import { React, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./teaminfo.css";
import Hao from "../Assets/Hao.png";
import Di from "../Assets/Di.jpg";
import Hy from "../Assets/Hy.jpg";
import Khuong from "../Assets/Khuong.jpg";
import Aos from "aos";
import Facebook from "../Assets/facebook.png";

function Teaminfo() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div id="TEAMPROFILE" className="section__padding">
      <div className="rise__teaminfo_section">
        <div className="rise__teaminfo_header">
          <h1 style={{ fontWeight: "800" }}>TEAM PROFILE</h1>
          <hr />
        </div>
      </div>

      <div className="rise__teaminfo_paragraph">
        <p>
          We are team TechTitans. Our team consists of 4 people who are To Gia
          Hy, Nguyen Nguyen Khuong, Doan Thien Di and Pham Viet Hao. Despite our
          differences in expertise, we share the same targets and goals in this
          project, which is to design an IoT-based system that optimizes waste
          collection routes, using sensors to measure bin fullness and an
          algorithm to find the most efficient paths for the waste-collecting
          trucks.
        </p>
      </div>

      <div className="rise__teaminfo_member_section" data-aos="fade-right">
        <div className="rise__teaminfo_member">
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
            <a href="" target="_blank">
              <img src={Facebook} />
            </a>
          </div>
        </div>

        <div className="rise__teaminfo_member">
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
            <a href="" target="_blank">
              <img src={Facebook} />
            </a>
          </div>
        </div>

        <div className="rise__teaminfo_member">
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
            <a href="" target="_blank">
              <img src={Facebook} />
            </a>
          </div>
        </div>

        <div className="rise__teaminfo_member">
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
            >
              <img src={Facebook} />
            </a>
          </div>
        </div>
      </div>
      <div className="rise__teaminfo_btn">
        <button
          type="button"
          class="btn btn-outline-success"
          id="seebtn"
          onClick={handleShow}
        >
          Our goal
        </button>
        <Modal className="modalBackground" show={show} onHide={handleClose}>
          <div className="modalContainer">
            <div className="modal__btn_section ">
              <button id="modal_btn_close" onClick={handleClose}>
                <span>X</span>
              </button>
            </div>
            <Modal.Header>
              <Modal.Title className="title">OUR GOAL</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal_body">
              <h5>Team name</h5>
              <p>TechTitans</p>
              <h5>Team introduction</h5>
              <p>
                We are team TechTitans. Our team consists of 4 people who are To
                Gia Hy, Nguyen Nguyen Khuong, Doan Thien Di and Pham Viet Hao.
                Despite our differences in expertise, we share the same targets
                and goals in this project, which is to design an IoT-based
                system that optimizes waste collection routes, using sensors to
                measure bin fullness and an algorithm to find the most efficient
                paths for the waste-collecting trucks.
              </p>
              <h5>Team Goal</h5>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  In Vietnam, refuse trucks are one of ways that we can keep our
                  city clean. They travel through our streets and usually follow
                  a predetermined route. These are true for medical refuse
                  trucks as well; the only difference is that they need to
                  process medical waste by incinerating them in one of the
                  processing plants. But sometimes, the bins are not full,
                  making the trip to that clinic or hospital a waste of carbon
                  emissions. And these trucks emit a higher level of CO2 to the
                  environment than most vehicles. If we leave this problem
                  unattended, it will have a long-lasting negative effect to
                  Vietnams’ environment as the trucks are responsible for 80% of
                  the carbon emission.
                </li>
                <li>
                  We need to find a way to notify the refuse truck drivers which
                  bins are full. Furthermore, we must find them the most
                  efficient route, so they do not have to travel long. If we can
                  solve this problem, it will significantly reduce the time
                  these trucks are on the road and save our environment.
                </li>
                <li>
                  The components of the project include an IoT hardware
                  component that uses ultrasonic sensors to scan bin fullness.
                  It then transmits the data collected from the sensors
                  controlled by a microprocessor to the internet using a SIM
                  module. Our website collects this data then passes it through
                  the routing algorithm to determine which bins are ready to
                  pick up and what is the most efficient route to getting there.
                  The website displays this information through an intuitive
                  UI/UX design, which helps the truck drivers move
                  through the city in a quick and timely matter.
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer className="modal_footer">
              <button id="seebtn" onClick={handleClose}>
                {" "}
                Close{" "}
              </button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Teaminfo;
