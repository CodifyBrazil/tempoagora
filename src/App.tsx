import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { API } from "./service/API_INTERNAL";
import { API_LOCATION } from "./service/API_LOCATION";

//   sm: '30em',
//   md: '48em',
//   lg: '62em',
//   xl: '80em',
//   '2xl': '96em',

// const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

const App = () =>{

  const [infoCity, setInfoCity] = useState([]);
  const[image, setImage] = useState('');

  const getInfoCity = async (e: ChangeEvent<HTMLInputElement>) => {

    const code = e.target.value;

    if (code.length > 4){

      setTimeout(async () => {
        console.log()
        const { data } = await API.getCodeCity(code);
        const codeCity = data.map((item: any) => item.codigo);
        const infoTemperature = await API.getTemperatureCity(codeCity[0]);
        const daysTemperature = infoTemperature[codeCity];
        setInfoCity(daysTemperature);
      }, 2000);      
    }
    else{
      console.log('carregando ...');
    }
    console.log(infoCity);
  }




  return (
    <Flex bg='#111' w={'100%'} h='100vh'>
      <Flex 
      w={{base:'100%', md: '100%', lg:'40%'}} 
      border={'1px solid #333'}
      boxShadow='white-2xl'
      borderRadius={'8px'}
      bg='#333'
      m='auto'
      flexDirection={'column'}>

        {image&&
        <Flex m='auto' justifyContent={'center'} w='100%' p={'8px'}>
          <Image src={image} w='98%' h='200px' objectFit={'cover'} borderRadius='8px'/>
        </Flex>
        }
        
        <Flex flexDirection={'column'} color='#fff' as='b' fontFamily={'sans-serif'} p='8px' alignItems={'center'}>
          <Text mb='5px' fontSize={'13px'}>Digite o nome da cidade:</Text>
          <Flex w={{base:'100%', md: '100%', lg: '70%'}}>
            <Input w='100%' borderColor="#6549ff" border={"2px"} bg={'#fff'} color='#333' autoComplete="off" placeholder="Digite o nome da cidade" onChange={(e)=> getInfoCity(e)}/>
            <Button bg={'#fff'} border='2px solid #6549ff' ml='5px'></Button>
          </Flex>
          
        </Flex>

        {infoCity&&
        <Flex flexDirection={'row'} color='#fff' justifyContent={'space-around'} fontFamily={'sans-serif'} p='8px'>
          <Flex w={'40%'} p='5px' bg='#f74052' h={'100px'} borderRadius='8px' flexDirection={'column'}>
            <Text as='b' fontSize={'13px'}>Temp. Max.</Text>
            <Text m='auto' as='b' fontSize={'50px'}>18º</Text>
          </Flex>

          <Flex w={'40%'} p='5px'
           bg='#31a8f7' h={'100px'} borderRadius='8px' flexDirection={'column'}>
            <Text as='b' fontSize={'13px'}>Temp. Min.</Text>
            <Text m='auto' as='b' fontSize={'50px'}>09º</Text>
          </Flex>
        </Flex>
        }     



      </Flex>
    </Flex>
  )
}

export default App;