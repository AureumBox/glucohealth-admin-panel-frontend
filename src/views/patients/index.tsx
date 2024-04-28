import { FunctionComponent, useCallback } from "react";
import MainCard from "components/cards/MainCard";
import Table from "./table";
import usePaginate from "./use-paginate";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { Button, Typography } from "@mui/material";
import { IconCirclePlus } from "@tabler/icons";

const PatientsPage: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { patients, paginate, setPage, fetchPatients } = usePaginate();

  const goToCreate = useCallback(() => {
    navigate("/patients/create");
  }, [navigate]);

  return (
    <MainCard
      className={className}
      headerClass={"page-header"}
      title={
        <div className={"page-header"}>
          <Typography variant="h3" className={"title-header"}>
            Pacientes
          </Typography>
          <Button
            color="primary"
            variant={"outlined"}
            onClick={goToCreate}
            startIcon={<IconCirclePlus />}
          >
            Crear
          </Button>
        </div>
      }
    >
      <Table
        items={patients}
        paginate={paginate}
        onChange={setPage}
        fetchItems={fetchPatients}
      />
    </MainCard>
  );
};

interface Props {
  className?: string;
}

export default styled(PatientsPage)`
  width: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;
