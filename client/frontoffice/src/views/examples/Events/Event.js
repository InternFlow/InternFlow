//Event
import styled from "styled-components";
import MyEventModal from "./MyEventModel";
import { useState } from "react";
import "./Events.css";

const Event = (props) => {
  const Eventdata = props;
  const { title, location, creator, imagePath } = props;
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <MyEventModal
        show={modalShow}
        data={Eventdata}
        onHide={() => setModalShow(false)}
      />
      <EventCard>
        <div className="item-img">
          <img src={imagePath} alt=""></img>
        </div>
        <div className="item-body">
          <h5 className="item-name">{title}</h5>
          <span className="item-creator">{creator}</span>
          <br />
          <div className="item-Type">
            <span className="">{location}</span>
          </div>
        </div>
        <div className="item-btns flex">
          <button
            className="item-btn see-details-btn"
            onClick={() => setModalShow(true)}
          >
            See details
          </button>
          <button className="item-btn add-to-cart-btn">Participate</button>
        </div>
      </EventCard>
    </>
  );
};

const EventCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  .item-body {
    margin: 14px 0;
    padding: 4px 18px;

    .item-name {
      font-size: 15px;
      line-height: 1.4;
      font-weight: 800;
    }
    .item-creator {
      font-size: 12.5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
    .item-Type {
      font-size: 12.5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .item-btns {
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    margin-top: auto;
    .item-btn {
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn {
        background-color: transparent;
        border: 1px solid var(--clr-black);
        margin-right: 5px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
        }
      }

      &.add-to-cart-btn {
        background: rgba(0, 0, 0, 0.9);
        color: var(--clr-white);
        border: 1px solid rgba(0, 0, 0, 0.9);

        &:hover {
          background-color: transparent;
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
`;

export default Event;
