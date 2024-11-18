import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Platform } from "react-native";

const logo = require("../assets/Logo Definitivo.png");

const HomePage = ({ navigation }) => {
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleStartClick = () => {
    setIsRegisterModalVisible(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setIsCheckboxChecked(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
    setLoginData({
      email: "",
      password: "",
    });
  };

  const handleFormSubmit = async () => {
    if (!isCheckboxChecked) {
      Alert.alert("Attenzione", "Devi essere maggiorenne per registrarti!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Successo", "Registrazione completata con successo!");
        setIsRegisterModalVisible(false);
      }
    } catch (error) {
      Alert.alert(
        "Errore",
        error.response?.data?.message || "Errore durante la registrazione"
      );
    }
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Successo", "Login effettuato con successo!");
        setIsLoginModalVisible(false);
      }
    } catch (error) {
      Alert.alert("Errore", error.response?.data || "Errore durante il login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.navButtons}>
          <TouchableNativeFeedback
            onPress={handleLoginClick}
            background={TouchableNativeFeedback.Ripple("#ffbb00", false)}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonText}>Login</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={handleStartClick}
            background={TouchableNativeFeedback.Ripple("#0056b3", false)}>
            <View style={styles.navButton}>
              <Text style={styles.navButtonText}>Signup</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>BEER RECIPE GENERATOR</Text>

        <View style={styles.logoContainer}>
          <Animated.Image
            source={logo}
            style={[
              styles.logo,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </View>

        <TouchableNativeFeedback
          onPress={handleStartClick}
          background={TouchableNativeFeedback.Ripple("#1e7e34", false)}>
          <View style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniziamo!</Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      {/* Login Modal */}
      <Modal
        visible={isLoginModalVisible}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsLoginModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Accedi al tuo account</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={loginData.email}
              onChangeText={(text) =>
                setLoginData({ ...loginData, email: text })
              }
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={loginData.password}
              onChangeText={(text) =>
                setLoginData({ ...loginData, password: text })
              }
              secureTextEntry
            />

            <TouchableNativeFeedback
              onPress={handleLoginSubmit}
              background={TouchableNativeFeedback.Ripple("#1e7e34", false)}>
              <View style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Accedi</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>

      {/* Register Modal */}
      <Modal
        visible={isRegisterModalVisible}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsRegisterModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Registrazione</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={formData.firstName}
              onChangeText={(text) =>
                setFormData({ ...formData, firstName: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Cognome"
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData({ ...formData, lastName: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setIsCheckboxChecked(!isCheckboxChecked)}>
              <View
                style={[
                  styles.checkboxBox,
                  isCheckboxChecked && styles.checkboxChecked,
                ]}
              />
              <Text style={styles.checkboxLabel}>Sono maggiorenne 18+</Text>
            </TouchableOpacity>

            <TouchableNativeFeedback
              onPress={handleFormSubmit}
              background={TouchableNativeFeedback.Ripple("#1e7e34", false)}
              disabled={!isCheckboxChecked}>
              <View
                style={[
                  styles.submitButton,
                  !isCheckboxChecked && styles.submitButtonDisabled,
                ]}>
                <Text style={styles.submitButtonText}>
                  {isCheckboxChecked
                    ? "HAI IL PERMESSO DI ENTRARE!"
                    : "Devi essere maggiorenne"}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },

  header: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  navButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  navButton: {
    margin: 5,
    padding: 10,
    backgroundColor: "#ffbb00",
    borderRadius: 8,
    marginHorizontal: 15,
    width: 120,
    alignItems: "center",
    elevation: 10,
  },

  navButtonText: {
    fontSize: 20,
    color: "#333333",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 48,
    marginTop: -25,
    marginBottom: 50,
    textAlign: "center",
    color: "black",
    textShadowColor: "#ffbb00",
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },

  logoContainer: {
    padding: 0,
    alignItems: "center",
    marginTop: 20,
  },

  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },

  startButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    margin: 20,
    marginTop: 100,
    elevation: 10,
  },

  startButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    margin: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#28a745",
  },
  checkboxLabel: {
    fontSize: 16,
  },
  submitButtonDisabled: {
    backgroundColor: "#cccccc",
  },
});

export default HomePage;
