# K6 Docker

Run K6 in a local container with results stored in influxdb and results visualized with a grafana dashboard.

## Setting up

```bash
# Clone the repo
git clone https://github.com/softrams/k6-docker.git
```

## Run Influxdb and grafana

```bash
cd k6-docker
docker-compose up -d influxdb grafana
```

### Setup Grafana Dashboard

- Open Grafana and setup dashboard
- Visit **http://localhost:3000**
- Click on **+** symbol (or **Create** menu) in the sidebar nav/menu, choose '**Import**'.
- Click on '**Upload JSON File**' and select the **grafana_dashboard.json** included in the repo
- In the configuration options, click on the dropdown for '**myinfluxdb**' field and choose '**myinfluxdb**.
- Change the name if you want
- Click on '**Import**' to create the dashboard.
- That's it your dashboard is all set.

### Run Tests

```bash
docker-compose run -v <path-to-testscripts-folder>:/scripts k6 run /scripts/<test-script-name>

# For example, if all your test scripts are in a folder /Users/murali/scripts and would like to run hello-world.js, run as following:
docker-compose run -v /Users/murali/scripts:/scripts k6 run /scripts/hello-world.js
# On windows, the syntax is slightly different to specify the volume path.
# For example if your scripts are in c:/Users/murali/scripts
docker-compopse run -v //c/Users/murali/scripts:/scripts k6 run /scripts/hello-world.js
```

### Watch test results on Dashboard

That's all. Now as you run your tests, you can see live results on the Grafana Dashboard.
Feel free to tweak the dashboard and add your metrics as you see fit.

## Stopping Docker Containers

```bash
# K6 container automatically stops after the test run is complete.
# If for any reason, container is still running, you can run
docker ps -a -q --filter="name=k6-docker_k6"

# Stop grafana
docker ps -a -q --filter="name=k6-docker_grafana"

# Stop influxdb
docker ps -a -q --filter="name=k6-docker_influxdb"
```

## Credits

All Dockerfiles and docker-compose files are from K6 Github. I made updates to the docker-compose
to load K6 from docker image rather than building from local source as in Githu repo.

- K6 Github: https://github.com/loadimpact/k6
- K6 Docs: https://docs.k6.io/docs/influxdb-grafana
- Grafana Dashboard: https://grafana.com/dashboards/2587 by Dave Cadwallader
