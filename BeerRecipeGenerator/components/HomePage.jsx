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
              <Text style={styles.navButtonText}>Sign up</Text>
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
            <Text style={styles.startButtonText}>Start!</Text>
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
              placeholderTextColor="white"
              value={loginData.email}
              onChangeText={(text) =>
                setLoginData({ ...loginData, email: text })
              }
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
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
              placeholderTextColor="white"
              value={formData.firstName}
              onChangeText={(text) =>
                setFormData({ ...formData, firstName: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Cognome"
              placeholderTextColor="white"
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData({ ...formData, lastName: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
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
                    ? "Hai il permesso di entrare!"
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
    fontWeight: 600,
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
    fontSize: 50,
    marginTop: -25,
    marginBottom: 40,
    textAlign: "center",
    color: "#fff",
    textShadowColor: "#black",
    textShadowRadius: 10,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "Teko-regular",
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
    backgroundColor: "#ffbb00",
    padding: 20,
    borderRadius: 5,
    margin: 20,
    marginTop: 100,
    elevation: 10,
  },

  startButtonText: {
    fontSize: 28,
    color: "#333333",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  modalContent: {
    backgroundColor: "#ffbb00",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    margin: 10,
    border: 5,
    borderColor: "#333333",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#333333",
    color: "white",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#333333",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
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
    borderColor: "#333333",
    marginRight: 10,
    backgroundColor: "#333333",
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: "#28a745",
  },
  checkboxLabel: {
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  submitButtonDisabled: {
    backgroundColor: "#cccccc",
  },
});

export default HomePage;
