import React from "react";
import Card from "../components/Cards/Card";

function CategoryCards() {
  return (
    <>
      <Card
        title={"Car Rentals"}
        icon={"car"}
        bg={
          "https://st2.depositphotos.com/1370441/8050/i/450/depositphotos_80502214-stock-photo-couple-driving-convertable-at-sunset.jpg"
        }
      />
      <Card
        title={"Hotels"}
        icon={"hotel"}
        bg={
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <Card
        title={"Travel Packages"}
        icon={"umbrella-beach"}
        bg={
          "https://media.istockphoto.com/id/1419610165/photo/cropped-photo-of-an-unrecognizable-woman-putting-a-cosmetic-bag-in-her-suitcase.jpg?s=612x612&w=0&k=20&c=jeSeys7FslOUUHAkiUEO48gqeoDhSwb1kI8eVd5DaiQ="
        }
      />
    </>
  );
}

export default CategoryCards;
