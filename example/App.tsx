import { TouchableOpacity, SafeAreaView, ScrollView, Text } from "react-native";
import SwipeClean from "swipe-clean";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            console.log("clicked");
            console.log(SwipeClean.uninstall("com.whatsapp"));
          }}
        >
          <Text>Uninstall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            console.log("clicked");
            console.log(await SwipeClean.getInstalledApps());
          }}
        >
          <Text>getInstalledApps</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
  },
};
