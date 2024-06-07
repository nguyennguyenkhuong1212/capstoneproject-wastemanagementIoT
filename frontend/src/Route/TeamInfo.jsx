import { React, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./teaminfo.css";
import Hao from "../Assets/Hao.png";
import Di from "../Assets/Di.jpg";
import Hy from "../Assets/Hy.jpg";
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
            <img src={Hao} />
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
                  Firstly, since RMIT University has an enormous campus in
                  Saigon South with many buildings together with the naming
                  convention and the layout of the rooms are slightly confusing,
                  there are a lot of people getting lost and they spend a lot of
                  time navigating around the campus. Thanks to our research and
                  survey, we found out besides from new students and visitors,
                  the majority is actually current students. Therefore, our goal
                  is to create a web application that mainly focuses on
                  introducing RMIT University and Saigon South campus
                  exclusively. Furthermore, it will contain more specific
                  information about the layout of campus and the rooms in each
                  building, which can help users find rooms easier.
                </li>
                <li>
                  Secondly, we have discovered that there are equivalent
                  questions about finding a specific location, navigating, and
                  other general questions that expect the same answers. However,
                  RMIT Student Connect, a department that can answer these
                  questions, only works in office hours and students or visitors
                  cannot have their answers anytime they want. Hence, in our web
                  application, there is a chatbot available all time to answer
                  these general questions.
                </li>
                <li>
                  Finally, since there have not been any means of entertainment
                  focusing on Saigon South Campus, our team has created a game
                  for many reasons. The first reason is that the users can
                  freely discover the campus which is the game map at any time
                  they want instead of joining in virtual tours or campus tours.
                  Secondly, to enhance their experience and stimulate their
                  sense of victory, they can fight against monsters in our game
                  while discovering and if they win the final boss, they can
                  receive a certificate with a similar appearance to the
                  Bachelor’s degree graduation certificate. Finally, our game
                  can attract more students to RMIT University, especially
                  students who want to join the Game Design program.
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
