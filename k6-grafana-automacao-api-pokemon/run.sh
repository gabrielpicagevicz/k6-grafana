docker-compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Testes automatizados e de Carga http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker-compose run --rm k6 run /api-pokemon/getPokemon.js