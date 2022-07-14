import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button, Card } from "react-bootstrap";
import styles from "./SrapeHistory.module.css";
import axios from "axios";
import ErrorPage from "../Error/Error";
const baseURL = "http://localhost:3000/data";
export default function ScrapeHistory() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    
    axios.get(baseURL).then((response) => {
      setHistory(response.data);
    });
  }, []);

  if (!history) return <ErrorPage />;

  return (
    <div className="bgPadding mt-2 shadow-sm">
      <h1>SERP Scrape History</h1>
      <p className={clsx("text-black")}>
        Find all your SERP scrapes. Click on VIEW to analyze the SERP and get
        insights. Get an Excel report by clicking on DOWNLOAD
      </p>

      {history.map((item) => (
        <Card
          className={clsx("w-75", "mb-4", "shadow p-3 mb-5 bg-body rounded")}
        >
          <Card.Header as="h5" className={clsx(styles.bgHeader)}>
            {item.query}
          </Card.Header>
          <Card.Body>
            <Card.Text>{item.date}</Card.Text>
            <div className="d-flex">
              <div className="flex-grow-1">
                <Button variant="none" className={clsx(styles.bgButton)}>
                  View
                </Button>
                <Button className={clsx("ms-4", "border")} variant="yellow-400">
                  Download
                </Button>
              </div>
              <Button variant="danger">Delete</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
