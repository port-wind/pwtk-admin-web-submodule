import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { IDatas } from '../type'

// 定义接口
interface Animal {
  animal: string
  isHit: boolean
}

interface Issue {
  postIssue: string
  animals: Animal[]
  customHtml?: string
}

interface IssueDisplayProps {
  datas: IDatas
  issues: Issue[]
  styleConfig: {
    numberSize: number
    numberSpacing: number
    borderRadius: number
    padding: number
  }
}

// 使用defineComponent创建TSX组件
export default defineComponent({
  name: 'IssueDisplay',
  
  props: {
    datas: {
      type: Object as PropType<IDatas>,
      required: true
    },
    issues: {
      type: Array as PropType<Issue[]>,
      required: true
    },
    styleConfig: {
      type: Object as PropType<IssueDisplayProps['styleConfig']>,
      required: true
    }
  },

  setup(props) {
    // 渲染动物列表
    const renderAnimalList = (animals: Animal[]) => {
      return animals.map((animal, index) => (
        <span
          key={`animal-${index}`}
          class={['animal', { 'hit-highlight': animal.isHit }]}
          style={{
            fontSize: `${props.styleConfig.numberSize}px`,
            marginRight: `${props.styleConfig.numberSpacing}px`
          }}
        >
          {animal.animal}
        </span>
      ))
    }

    // 渲染HTML内容
    const renderHtmlContent = () => {
      return (
        <div class="html-content" innerHTML={props.datas.configParamJson.htmlContent || ''} />
      )
    }

    // 渲染期号列表
    const renderIssueList = () => {
      return props.issues.map((issue: Issue, index) => (
        <div
          key={`issue-${index}`}
          class="issue-item"
          style={{
            borderRadius: `${Math.max(0, props.styleConfig.borderRadius - 2)}px`,
            padding: `${Math.max(0, props.styleConfig.padding + 8)}px`
          }}
        >
          {/* 混合HTML和TSX内容 */}
          <div class="issue-header">
            <h3>第{issue.postIssue}期</h3>
            {renderHtmlContent()}
          </div>
          
          <div class="issue-content">
            {renderAnimalList(issue.animals || [])}
          </div>

          {/* 使用v-html等价的TSX写法 */}
          <div innerHTML={issue.customHtml || ''} />
        </div>
      ))
    }

    // 返回渲染函数
    return () => (
      <div class="issue-display-container">
        {renderIssueList()}
      </div>
    )
  }
}) 