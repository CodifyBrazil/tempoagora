import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { API } from "./service/API_INTERNAL";
import { API_LOCATION } from "./service/API_LOCATION";
import Lupa from "./assets/lupa.png";

const App = () => {
  const [infoCity, setInfoCity] = useState();
  const [image, setImage] = useState("");
  const [inputCity, setInputCity] = useState("londrina");

  const daysLasted = [];

  for (let i = 0; i < 5; i++) {
    daysLasted.push(new Date().getDate() + i);
  }


  let dayCurrent: any;
  const daysPlus= (day?:number) => {
      dayCurrent = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + (day?day:0),
    ).toLocaleDateString();
  }  

  const getInfoCity = async () => {
    if (inputCity.length > 4) {
      const HourCurrent = new Date().getHours();
      const period = (HourCurrent <= 12?'manha':'tarde');

      const { data } = await API.getCodeCity(inputCity);
      const codeCity = data.map((item: any) => item.codigo);
      const infoTemperature = await API.getTemperatureCity(codeCity[0]);
      const daysTemperature = await infoTemperature[codeCity];
      daysTemperature != undefined ? setInfoCity(daysTemperature[dayCurrent][period]) : "";
      // setImage(daysTemperature[dayCurrent][period]['icone']);
      console.log(infoCity);
    } else {
      console.log("Algo errado...");
    }
  };

  return (
    <Flex bg="#111" w={"100%"} h="100vh">
      <Flex
        w={{ base: "100%", md: "100%", lg: "40%" }}
        border={"1px solid #333"}
        boxShadow="white-2xl"
        borderRadius={"8px"}
        bg="#333"
        m="auto"
        flexDirection={"column"}
      >
        {/* {image!=undefined && (
          <Flex m="auto" justifyContent={"center"} w="100%" p={"8px"}>
            <Image
              src={image}
              w="98%"
              h="200px"
              objectFit={"cover"}
              borderRadius="8px"
            />
          </Flex>
        )} */}

        <Flex
          flexDirection={"column"}
          color="#fff"
          as="b"
          fontFamily={"sans-serif"}
          p="8px"
          alignItems={"center"}
        >
          <Text mb="5px" fontSize={"13px"}>
            Digite o nome da cidade:
          </Text>
          <Flex w={{ base: "100%", md: "100%", lg: "70%" }}>
            <Input
              w="100%"
              borderColor="#6549ff"
              border={"2px"}
              bg={"#fff"}
              color="#333"
              autoComplete="off"
              placeholder="Digite o nome da cidade"
              onChange={(e) => setInputCity(e.target.value)}
            />
            <Button
              bg={"#fff"}
              border="2px solid #6549ff"
              ml="5px"
              _hover={{ backgroundColor: "#6549ff" }}
              onClick={getInfoCity}
            >
              <Image src={Lupa} w="20px" />
            </Button>
          </Flex>
        </Flex>

        <Flex m={'auto'} mb='10px'>
          {daysLasted.map((item, index)=> (
            <Button 
            onClick={() => daysPlus(index)}
            // disabled
            border={'2px solid #fff'} 
            _hover={{ backgroundColor: "#fff", color: "#333",border:"2px solid #6549ff"}} 
            bg='#6549ff' 
            color={'#fff'}
            mr='10px' 
            key={index}>{item}
            </Button>
          )

          )}
        </Flex>

        {infoCity &&
        <Flex
          flexDirection={"row"}
          color="#fff"
          justifyContent={"space-around"}
          fontFamily={"sans-serif"}
          p="8px"
        >
          
          <Flex
            w={"40%"}
            p="5px"
            bg="#f74052"
            h={"100px"}
            borderRadius="8px"
            flexDirection={"column"}
            border='4px solid #e50013'
          >
            <Text as="b" fontSize={"13px"}>
              Temp. Max.
            </Text>
            <Text m="auto" as="b" fontSize={"50px"}>
              {infoCity['temp_max']}º
            </Text>
          </Flex>

          <Flex
            w={"40%"}
            p="5px"
            bg="#31a8f7"
            h={"100px"}
            borderRadius="8px"
            flexDirection={"column"}
            border='4px solid #6549ff'
          >
            <Text as="b" fontSize={"13px"}>
              Temp. Min.
            </Text>
            <Text m="auto" as="b" fontSize={"50px"}>
            {infoCity['temp_min']}º
            </Text>
          </Flex>
        </Flex>}
      </Flex>
    </Flex>
  );
};

export default App;