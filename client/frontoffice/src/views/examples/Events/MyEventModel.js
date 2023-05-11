import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

export default function MyEventModel(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <EventModal>
        <Modal.Header closeButton>
          <img
            src={`http://127.0.0.1:5000/uploadImage/images/${props.data.imagePath}`}
            alt=""
          />
          ;
        </Modal.Header>
        <Modal.Body>
          <ul style={{ margin: "10px 0" }}>
            <li style={{ paddingBottom: "30px" }}>
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                Title
              </span>
              <div
                style={{
                  wordWrap: "break-word",
                }}
              >
                <h3>{props.data.title}</h3>
              </div>
            </li>
            <li style={{ paddingBottom: "30px" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Description:
              </span>
              <div
                style={{
                  wordWrap: "break-word",
                }}
              >
                {props.data.description}
              </div>
            </li>
            <li style={{ paddingBottom: "10px" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Created by:
              </span>
              <div style={{ wordWrap: "break-word" }}>{props.data.creator}</div>
            </li>
            <li style={{ paddingBottom: "10px" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Category:
              </span>
              <div
                style={{
                  wordWrap: "break-word",
                }}
              >
                {props.data.category}
              </div>
            </li>
            <li style={{ paddingBottom: "10px" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Type:
              </span>
              <div
                style={{
                  wordWrap: "break-word",
                }}
              >
                {props.data.location}
              </div>
            </li>
            <li style={{ paddingBottom: "10px" }}>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Adress:
              </span>
              <div
                style={{
                  wordWrap: "break-word",
                }}
              >
                {props.data.address}
              </div>
            </li>
            <li style={{ paddingBottom: "10px" }}>
              <span></span>
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Phone:
              </span>
              <div
                style={{
                  wordWrap: "break-word",
                }}
              >
                {props.data.moreInfo}
              </div>
            </li>
          </ul>
        </Modal.Body>
        {/* <Modal.Footer>
          <div className="item-btns flex">
            <button className="item-btn see-details-btn" onClick={props.onHide}>
              close
            </button>
          </div>
        </Modal.Footer> */}
      </EventModal>
    </Modal>
  );
}
const EventModal = styled.div`
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
