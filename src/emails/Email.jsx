import React from 'react'
import Logo from '../assets/HighSchoolMowers.png'

export default function Email() {
  return (
    <>
      <Img alt="Ode Grinder" className="mx-auto" height={250} src={Logo} />
      <Heading className="text-center">Welcome to HighSchoolMowers</Heading>
      <Text>
        Welcome to HighSchoolMowers! We're thrilled to have you on board. Our
        platform is designed to make lawn care easier and more efficient,
        helping you find the perfect solutions for your needs. Let's get
        started!
      </Text>
    </>
  );
}
