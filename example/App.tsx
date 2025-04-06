import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
} from "react-native";
import SwipeClean from "swipe-clean";
const queryClient = new QueryClient();
export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getInstalledApps"],
    queryFn: async () => {
      return await SwipeClean.getInstalledApps();
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          data?.map((app) => {
            console.log(app.icon);
            return (
              <TouchableOpacity
                key={app.packageName}
                onPress={() => {
                  console.log(SwipeClean.uninstall(app.packageName));
                }}
              >
                <Image
                  source={{ uri: `data:image/png;base64,${app.icon}` }}
                  style={{ width: 50, height: 50 }}
                />
                <Text>{app.name}</Text>
              </TouchableOpacity>
            );
          })
        )}
        <TouchableOpacity
          onPress={() => {
            console.log("clicked");
            console.log(SwipeClean.uninstall("com.whatsapp"));
          }}
        >
          <Text>Uninstall</Text>
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
