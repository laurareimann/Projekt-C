/* eslint-disable @typescript-eslint/no-unused-vars */

const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};

//leg wirft hier einen error, aber wird ohnehin erstmal nicht verwendet. Wird eventuell später für den score wichtig
export default function Distance({ leg }: DistanceProps) {
  return <div>Distance</div>;
}
