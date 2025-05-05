# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) – uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc/README.md) – uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint Configuration

If you are developing a production application, we recommend using TypeScript and enabling type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# Kubernetes Deployment – Web App Containerization

This branch contains an extended setup of the Travel Tracker project using **Kubernetes** to containerize and orchestrate application services beyond Docker Compose.

---

## What’s Included

- `mongodb-deployment.yaml`
- `backend-deployment.yaml`
- `frontend-deployment.yaml`
- `services.yaml` – NodePort/ClusterIP services for backend, frontend, and database
- `ingress.yaml` *(optional – HTTP routing)*
- `k8s-config/` – directory with all YAML manifests (if applicable)

---

## What Was Done

- Translated Docker Compose into modular Kubernetes YAML files
- Defined persistent volumes for MongoDB
- Configured internal service communication (backend, frontend, MongoDB)
- (Optional) Configured Ingress for frontend access

---

## Setup Instructions

To deploy using Kubernetes locally (e.g., Minikube, Docker Desktop):

```bash
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f services.yaml

# Optional:

kubectl apply -f ingress.yaml

Author
Tasmia Iqbal
Branch: tasmia_k8_branch



