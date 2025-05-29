... shell ...

```tsx file="app/dashboard/tests/page.tsx"
[v0-no-op-code-block-prefix]"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TestsPage() {
  const [overheadSquatSelections, setOverheadSquatSelections] = useState<
    string[]
  >([]);
  const [singleLegSquatSelections, setSingleLegSquatSelections] = useState<
    string[]
  >([]);
  const [walkingSelections, setWalkingSelections] = useState<string[]>([]);
  const [fmsScore, setFmsScore] = useState<number>(0);
  const [fcsScore, setFcsScore] = useState<number>(0);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Tests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overhead Squat */}
        <Card>
          <CardHeader>
            <CardTitle>Overhead Squat</CardTitle>
            <CardDescription>Assess mobility and stability.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Badge>{overheadSquatSelections.length}</Badge>
              <Select
                onValueChange={(value) =>
                  setOverheadSquatSelections((prev) => {
                    if (prev.includes(value)) {
                      return prev.filter((item) => item !== value);
                    } else {
                      return [...prev, value];
                    }
                  })
                }
                multiple
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p>Selections: {overheadSquatSelections.join(", ") || "None"}</p>
          </CardContent>
        </Card>

        {/* Single Leg Squat */}
        <Card>
          <CardHeader>
            <CardTitle>Single Leg Squat</CardTitle>
            <CardDescription>Evaluate balance and lower body strength.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Badge>{singleLegSquatSelections.length}</Badge>
              <Select
                onValueChange={(value) =>
                  setSingleLegSquatSelections((prev) => {
                    if (prev.includes(value)) {
                      return prev.filter((item) => item !== value);
                    } else {
                      return [...prev, value];
                    }
                  })
                }
                multiple
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p>Selections: {singleLegSquatSelections.join(", ") || "None"}</p>
          </CardContent>
        </Card>

        {/* Walking */}
        <Card>
          <CardHeader>
            <CardTitle>Walking</CardTitle>
            <CardDescription>Analyze gait and movement patterns.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Badge>{walkingSelections.length}</Badge>
              <Select
                onValueChange={(value) =>
                  setWalkingSelections((prev) => {
                    if (prev.includes(value)) {
                      return prev.filter((item) => item !== value);
                    } else {
                      return [...prev, value];
                    }
                  })
                }
                multiple
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="abnormal">Abnormal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p>Selections: {walkingSelections.join(", ") || "None"}</p>
          </CardContent>
        </Card>

        {/* FMS Tests */}
        <Card>
          <CardHeader>
            <CardTitle>FMS Tests</CardTitle>
            <CardDescription>Functional Movement Screen score.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Badge>{fmsScore}/21</Badge>
              <input
                type="number"
                value={fmsScore}
                onChange={(e) => setFmsScore(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
            <p>Score: {fmsScore}</p>
          </CardContent>
        </Card>

        {/* FCS */}
        <Card>
          <CardHeader>
            <CardTitle>FCS</CardTitle>
            <CardDescription>Functional Capacity Score.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Badge>{fcsScore}</Badge>
              <input
                type="number"
                value={fcsScore}
                onChange={(e) => setFcsScore(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
            </div>
            <p>Score: {fcsScore}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
