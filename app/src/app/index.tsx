import { useState ,useEffect} from 'react';
import {View,Text,FlatList,StyleSheet,Button} from 'react-native';

import {collection,onSnapshot} from 'firebase/firestore';
import {db} from '../firebaseConfig';

export default function HomeScreen(){
  const [leads, setLeads] = useState<{ id: string; name: string; email: string }[]>([]);


  useEffect(()=>{
    const leadsRef = collection(db,"leads");

    const unsubscribe= onSnapshot(leadsRef,(snapshot)=>{
    const loadedLeads: { id: string; name: string; email: string }[] = []; //Temporary Array in users Ram so that we can push it later

      snapshot.forEach((doc)=>{
        const docData = doc.data();
        loadedLeads.push({
          id:doc.id,
          name:docData.data?.fullName || "Test User",
          email:docData.data?.email || "No Email"
        });
      });
      setLeads(loadedLeads);
    })
    return ()=>unsubscribe();

  },[]);


  return (
    <View style={{ padding: 50 }}> 
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Live Leads</Text>
      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={{ marginVertical: 10 }}>
          {item.name} - {item.email}
          </Text>}
      />
    </View>
  );
}

