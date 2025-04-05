import {  useRouter} from 'expo-router';
import { View , Text , TouchableOpacity} from 'react-native';


export default function Index() {
  
  const router = useRouter()

  

  return (
    <View style={{flex : 1 , justifyContent : "center" , alignItems:"center"}}>
      <TouchableOpacity onPress={() => router.push("./camera")}>
        <Text>Entry Page</Text>
      </TouchableOpacity>
    </View>
  );
}
