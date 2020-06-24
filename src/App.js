import React, { useState, useEffect } from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => setRepositories(data));
  }, []);

  async function handleLikeRepository(id) {
    const { data } = await api.post(`repositories/${id}/like`);
    const indexRepository = repositories.findIndex(repository => repository.id == id);
    let updatedRepositories = [...repositories];
    updatedRepositories[indexRepository] = data;
    setRepositories([...updatedRepositories]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
        data={ repositories }
        keyExtractor={ repository => repository.id }
        renderItem={ ({ item: repository }) => (
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{ repository.title }</Text>
            <View style={styles.techsContainer}>
              <FlatList
              numColumns={3}
              data={ repository.techs }
              keyExtractor={ tech => tech }
              renderItem={ ({ item: tech }) => (
                <>
                  <Text style={styles.tech}>
                    { tech }
                  </Text>
                </>
              )}>
              </FlatList>
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repository.id}`}
              >
                { repository.likes } curtidas
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => handleLikeRepository(repository.id)}
              testID={`like-button-${repository.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
        )}>
        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 14,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: "bold",
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: "#04d361",
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    height: 45,
    backgroundColor: "#7159c1",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff"
  },
});
