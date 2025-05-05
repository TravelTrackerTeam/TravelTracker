# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) – uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc/README.md) – uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint Configuration

If you are developing a production application, we recommend using TypeScript and enabling type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Kubernetes Deployment – Web App Containerization

This branch contains an extended setup of the Travel Tracker project using **Kubernetes** to containerize and orchestrate services beyond Docker Compose.

---

### K8/ – File Descriptions

- `backend-deployment.yaml`  
  Deploys the backend application using a Kubernetes Deployment resource.

- `backend-service.yaml`  
  Exposes the backend via NodePort or ClusterIP to be accessed by other services (like frontend).

- `frontend-deployment.yaml`  
  Deploys the React frontend containerized in Kubernetes.

- `frontend-service.yaml`  
  Exposes the frontend application to the browser or via Ingress.

- `mongodb-deployment.yaml`  
  Launches MongoDB using a Deployment and optional volume.

- `mongodb-service.yaml`  
  Internal service for backend to connect to MongoDB securely (ClusterIP).

- `ingress.yaml` *(optional)*  
  HTTP routing configuration for clean URLs. Can route `/api` to backend and `/` to frontend.

---

### Setup Instructions

To deploy locally with Kubernetes (e.g., via Docker Desktop):

```bash
kubectl apply -f K8/mongodb-deployment.yaml
kubectl apply -f K8/mongodb-service.yaml

kubectl apply -f K8/backend-deployment.yaml
kubectl apply -f K8/backend-service.yaml

kubectl apply -f K8/frontend-deployment.yaml
kubectl apply -f K8/frontend-service.yaml

# Optional:
kubectl apply -f K8/ingress.yaml

Author
Tasmia Iqbal
Branch: tasmia_k8_branch



