<div align="center">
  
# BGRS Protocol Server 🚀

A high-performance, concurrent server implementation for a course registration system protocol (BGRS), developed as part of the Systems Programming Laboratory (SPL) course. The project demonstrates two concurrency models: Thread-Per-Client and the Reactor design pattern.

<br/>

<!-- Replace [YOUR_USERNAME]/[YOUR_REPOSITORY] with your actual GitHub user and repo name -->
![GitHub issues](https://img.shields.io/github/issues/[YOUR_USERNAME]/[YOUR_REPOSITORY]?style=for-the-badge&color=brightgreen)
![GitHub forks](https://img.shields.io/github/forks/[YOUR_USERNAME]/[YOUR_REPOSITORY]?style=for-the-badge&color=blue)
![GitHub stars](https://img.shields.io/github/stars/[YOUR_USERNAME]/[YOUR_REPOSITORY]?style=for-the-badge&color=yellow)

</div>

---

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-setup--installation">Setup</a> •
  <a href="#-protocol-specification">Protocol Specification</a> •
  <a href="#-contact">Contact</a>
</p>

---

## 📖 Overview
This project provides a robust server framework in Java capable of handling multiple clients concurrently. It includes a specific implementation for the **BGRS (BGU Registration System)** protocol, a custom application-level protocol for managing university course registrations.

The server is designed to be generic and can operate in two different modes:
1.  **Thread-Per-Client (TPC):** A new thread handles each client.
2.  **Reactor:** A single-threaded, event-driven model for high-efficiency I/O.

---

## ✨ Key Features
*   **Dual Concurrency Models:** Choose between a Thread-Per-Client (TPC) model for simplicity or a high-performance, non-blocking Reactor pattern for scalability.
*   **Generic & Extensible Design:** The server is decoupled from the protocol logic using interfaces (`BidiMessagingProtocol`, `MessageEncoderDecoder`), making it easy to implement new protocols.
*   **Custom Protocol Implementation:** A complete implementation of the BGRS protocol, handling user registration, login, course management, and status checks.
*   **Robust Message Handling:** A custom encoder-decoder handles the serialization and deserialization of network messages based on the BGRS protocol specification.

---

## 🛠️ Tech Stack
This project was built using the following technologies:

!Java
!Maven
!Git

---

## 🏗️ Architecture
The application follows a client-server architecture. The core of the project is a generic server that can be instantiated with different concurrency strategies and protocol implementations.

### Concurrency Models
*   **`ThreadPerClientServer` (TPC):** A straightforward multi-threaded server where each client connection is handled by a dedicated thread. This model is easier to reason about but can be resource-intensive with a large number of concurrent clients.
*   **`Reactor`:** An event-driven architecture that uses a single thread to handle I/O for multiple clients. It leverages Java NIO's `Selector` to monitor multiple sockets for incoming data, making it highly scalable and efficient by avoiding the overhead of thread creation and context switching for each client.

### Decoupled Design
The server logic is completely separated from the application protocol logic. This is achieved by using two main interfaces:
*   **`MessageEncoderDecoder`:** Responsible for translating between raw byte streams from the network and structured message objects that the protocol can understand.
*   **`BidiMessagingProtocol`:** Defines the logic for processing incoming messages and generating responses. The server uses an instance of this protocol to handle all application-level communication for a given client.

This design allows the same server framework (`Reactor` or `TPC`) to run any implemented protocol (e.g., Echo, BGRS) without any code changes to the server itself.

---

## ⚙️ Setup & Installation
To run this project, you will need Java and Maven installed on your machine.

### Prerequisites
*   Java (Version 11 or higher)
*   Apache Maven

### Installation & Running
1.  **Clone the repository**
    ```bash
    # Replace with your actual repository URL
    git clone https://github.com/[YOUR_USERNAME]/[YOUR_REPOSITORY].git
    ```
2.  **Navigate to the project directory**
    ```bash
    cd [YOUR_REPOSITORY]
    ```
3.  **Compile and package the project using Maven**
    ```bash
    mvn clean package
    ```
4.  **Run the server**
    The server can be started in either `Reactor` or `TPC` mode. You must provide a port number as a command-line argument.

    **To run the Reactor server:**
    ```bash
    java -cp target/spl-net-1.0-SNAPSHOT.jar bgu.spl.net.impl.BGRSServer.ReactorMain 7777
    ```

    **To run the TPC server:**
    ```bash
    java -cp target/spl-net-1.0-SNAPSHOT.jar bgu.spl.net.impl.BGRSServer.TPCMain 7777
    ```
    *(Replace `7777` with your desired port)*

---

## 📜 Protocol Specification
The server implements the BGRS protocol, which consists of messages sent from the client to the server. The server responds with an `ACK` (Opcode 12) or `ERROR` (Opcode 13) message.

| Opcode | Command        | Sent By | Description                                                              |
|:-------|:---------------|:--------|:-------------------------------------------------------------------------|
| 1      | `ADMINREG`     | Anyone  | Register a new admin user.                                               |
| 2      | `STUDENTREG`   | Anyone  | Register a new student user.                                             |
| 3      | `LOGIN`        | Anyone  | Log in with a username and password.                                     |
| 4      | `LOGOUT`       | Logged In | Log out from the system.                                                 |
| 5      | `COURSEREG`    | Student | Register for a specific course.                                          |
| 6      | `KDAMCHECK`    | Student | Check the prerequisite courses for a given course.                       |
| 7      | `COURSESTAT`   | Admin   | Get the status of a course (e.g., registered students, available seats). |
| 8      | `STUDENTSTAT`  | Admin   | Get the status of a student (e.g., list of registered courses).          |
| 9      | `ISREGISTERED` | Student | Check if the student is registered for a specific course.                |
| 10     | `UNREGISTER`   | Student | Unregister from a specific course.                                       |
| 11     | `MYCOURSES`    | Student | Get a list of all courses the student is currently registered for.       |

---

## 📫 Contact
*Replace with your contact information*

Your Name - LinkedIn - your.email@example.com

Project Link: [https://github.com/[YOUR_USERNAME]/[YOUR_REPOSITORY]](https://github.com/[YOUR_USERNAME]/[YOUR_REPOSITORY])