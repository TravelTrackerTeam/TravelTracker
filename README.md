# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

This branch contains an extended setup of the Travel Tracker project using Kubernetes to containerize and orchestrate the application’s services beyond Docker Compose.

What’s Included:
mongodb-deployment.yaml

backend-deployment.yaml

frontend-deployment.yaml

services.yaml (NodePort/ClusterIP for backend, frontend, and DB)

ingress.yaml (optional – for HTTP routing)

k8s-config/ directory with all manifests (if organized)

What was done:
Translated Docker Compose setup into individual Kubernetes deployment and service YAMLs

Defined persistent volumes for MongoDB

Configured internal service communication between frontend, backend, and database

Optionally included an Ingress controller for frontend access via browser

How to Run (Basic):
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f services.yaml

# Optional:
kubectl apply -f ingress.yaml

Purpose:
This was an independent effort to experiment with real-world deployment tools. While not used in the final team deployment (Docker Desktop only), this branch demonstrates scalable orchestration techniques that could be used in production or CI/CD pipelines.

Author:
Tasmia Iqbal – [Branch: tasmia_k8_branch]

