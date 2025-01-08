import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import projImg4 from "../assets/img/project-img4.png";
import projImg5 from "../assets/img/project-img5.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projects = [
    {
      title: "Nu Chika Enabuka",
      description: "Modern website made for nuchikaenabuka company. available online.",
      imgUrl: projImg1,
    },
    {
      title: "Gundan app",
      description: "Productive app made for network marketers. available on playstore.",
      imgUrl: projImg2,
    },
    {
      title: "Degash app",
      description: "Event organizing app for those who want evenet. available on playstore.",
      imgUrl: projImg3,
    },
    {
      title: "Space app",
      description: "Space app made by inspiration",
      imgUrl: projImg4,
    },
    {
      title: "Tiktok video",
      description: "Made for Nuchika enabuka anual meskel square event",
      imgUrl: projImg5,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p> A versatile Flutter developer, website developer, and content creator. My projects include AFDARA, an award-winning automobile diagnostics app, Gundan and Degash on the Playstore, and the dynamic NuChikaEnabuka website with e-commerce integration. I specialize in blending creativity and technical expertise to deliver impactful solutions across apps, websites, and digital content.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="section">
                        <p></p>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Hi, I’m Abenezer Girmaye, a passionate and multi-skilled professional with expertise in Flutter development, website development, and content creation. With 3 years of experience as a Flutter developer, I’ve honed my ability to build seamless and user-friendly mobile applications using stacked architecture. One of my proudest achievements is AFDARA, my award-winning final project, which combined Flutter, Python, and Arduino to create an automobile diagnostics solution. I’ve also developed live apps like Gundan and Degash, both of which are available on the Playstore, showcasing my ability to create practical and impactful solutions.

                          As a website developer, I love blending creativity with functionality to deliver dynamic platforms. A great example of this is the NuChikaEnabuka website, where I integrated e-commerce features using HTML, Bootstrap, and JavaScript, ensuring both a sleek design and a smooth user experience.

                          Beyond development, I’m also passionate about content creation and social media management. I currently manage the digital presence for NuChikaEnabuka and Kenenet Consultancy, where I create engaging content and implement strategic campaigns. From designing content calendars to producing motivational TikTok videos, I’ve developed a knack for storytelling that connects with audiences and drives results.

                          Whether I’m coding an app, designing a website, or crafting engaging content, I’m committed to delivering creative, impactful solutions that make a difference.</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
