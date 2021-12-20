import React, { Component, createContext } from "react";
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => {
      return room.featured === true;
    });
    let maxPrice = Math.max(
      ...rooms.map((item) => {
        return item.price;
      })
    );
    let maxSize = Math.max(
      ...rooms.map((item) => {
        return item.size;
      })
    );
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxSize,
      maxPrice,
    });
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((images) => {
        return images.fields.file.url;
      });
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => {
      return room.slug === slug;
    });
    return room;
  };

  handleChange = (e) => {
    const target = e.target;
    const value = e.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;
    this.setState({ [name]: value }, this.filterRooms);
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    let tempRooms = [...rooms];
    capacity = parseInt(capacity);
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => {
        return room.type === type;
      });
    }
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => {
        return room.capacity >= capacity;
      });
    }
    this.setState({ sortedRooms: tempRooms });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
