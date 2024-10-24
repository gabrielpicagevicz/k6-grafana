docker-compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Testes automatizados e de Carga http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker-compose run --rm k6 run /scripts/stress-test.js
docker-compose run --rm k6 run /scripts/easy-integracao/colaborador/colaborador-post.js
docker-compose run --rm k6 run /scripts/easy-integracao/colaborador/colaborador-get.js
