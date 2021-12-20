import React, { Component } from "react";
import Titile from "./Titile";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free cocktails",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam?",
      },
      {
        icon: <FaHiking />,
        title: "endless hiking",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam?",
      },

      {
        icon: <FaShuttleVan />,
        title: "free shuttle",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam?",
      },
      {
        icon: <FaBeer />,
        title: "strongest beer",
        info:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam?",
      },
    ],
  };
  render() {
    return (
      <section className="services">
        <Titile title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article className="service" key={index}>
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
