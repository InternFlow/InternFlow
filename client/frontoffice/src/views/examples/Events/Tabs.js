import React, { useState } from "react";
import styled from "styled-components";
import Event from "./Event";

const Tabs = (props) => {
  const { events } = props;
  const [activeTab, setActiveTab] = useState("TECHNOLOGY");
  const tabHandler = (category) => {
    setActiveTab(category);
  };

  return (
    <TabsWrapper>
      <div className="tabs">
        <ul className="flex flex-wrap">
          <li className="tabs-head-item">
            <button
              type="button"
              className={`tab-btn ${activeTab}`}
              onClick={() => tabHandler("SPORTS")}
            >
              Sports
            </button>
          </li>
          <li className="tabs-head-item">
            <button
              type="button"
              className={`tab-btn ${activeTab}`}
              onClick={() => tabHandler("BUSINESS")}
            >
              Business
            </button>
          </li>
          <li className="tabs-head-item">
            <button
              type="button"
              className={`tab-btn ${activeTab}`}
              onClick={() => tabHandler("POLITICAL")}
            >
              Political
            </button>
          </li>
          <li className="tabs-head-item">
            <button
              type="button"
              className={`tab-btn ${"activeTab"}`}
              onClick={() => tabHandler("TECHNOLOGY")}
            >
              Technology
            </button>
          </li>
          <li className="tabs-head-item">
            <button
              type="button"
              className={`tab-btn ${activeTab}`}
              onClick={() => tabHandler("DESIGN")}
            >
              Design
            </button>
          </li>
          <li className="tabs-head-item">
            <button
              type="button"
              className={`tab-btn ${activeTab}`}
              onClick={() => tabHandler("MARKETING")}
            >
              Marketing
            </button>
          </li>
        </ul>

        <div className="tabs-body">
          {events
            .filter((Event) => Event.category === activeTab)
            .map((event) => (
              <Event key={event._id} {...event} />
            ))}
        </div>
      </div>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  .tabs {
    margin-top: 16px;
    .tabs-head-item button {
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body {
      margin-top: 32px;
    }

    @media screen and (min-width: 600px) {
      .tabs-body {
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px) {
      .tabs-body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px) {
      .tabs-body {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default Tabs;
