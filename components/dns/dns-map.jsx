import { AspectRatio } from '@/components/ui/aspect-ratio'
import { VisSingleContainer, VisTooltip, VisTopoJSONMap, VisTopoJSONMapSelectors } from '@unovis/react'
import { WorldMapSimplestTopoJSON } from '@unovis/ts/maps'

export function DNSMap({ formData }) {
  const triggers = {
    [VisTopoJSONMapSelectors.feature]: (d) => {
      // console.log(Date.now())
      return `<span>x :  ${d.x}<br/>y :  ${d.y}</span>`
    },
  }

  const data = {
    areas: [
      {
        id: 'CN',
        count: 1,
      },
    ],
  }

  return (
    <AspectRatio ratio={65 / 30}>
      <VisSingleContainer key={formData.time} data={data} className="h-full">
        <VisTopoJSONMap topojson={WorldMapSimplestTopoJSON} />
        <VisTooltip triggers={triggers} />
      </VisSingleContainer>
    </AspectRatio>
  )
}
