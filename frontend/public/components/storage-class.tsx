import * as React from 'react';

import { ColHead, DetailsPage, List, ListHeader, ListPage } from './factory';
import { Cog, detailsPage, navFactory, ResourceCog, SectionHeading, ResourceLink, ResourceSummary } from './utils';
import { fromNow } from './utils/datetime';
// eslint-disable-next-line no-unused-vars
import { K8sResourceKindReference } from '../module/k8s';

import { registerTemplate } from '../yaml-templates';

registerTemplate('storage.k8s.io/v1.StorageClass', `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: example
provisioner: my-provisioner
reclaimPolicy: Delete
`);

export const StorageClassReference: K8sResourceKindReference = 'StorageClass';

const menuActions = [Cog.factory.ModifyLabels, Cog.factory.ModifyAnnotations, Cog.factory.Edit, Cog.factory.Delete];

const StorageClassHeader = props => <ListHeader>
  <ColHead {...props} className="col-sm-4 col-xs-6" sortField="metadata.name">Name</ColHead>
  <ColHead {...props} className="col-sm-4 col-xs-6" sortField="provisioner">Provisioner</ColHead>
  <ColHead {...props} className="col-sm-2 hidden-xs" sortField="reclaimPolicy">Reclaim Policy</ColHead>
  <ColHead {...props} className="col-sm-2 hidden-xs" sortField="metadata.creationTimestamp">Created</ColHead>
</ListHeader>;


const StorageClassRow: React.SFC<StorageClassRowProps> = ({obj}) => {
  return <div className="row co-resource-list__item">
    <div className="col-sm-4 col-xs-6 co-break-word co-resource-link-wrapper">
      <ResourceCog actions={menuActions} kind={StorageClassReference} resource={obj} />
      <ResourceLink kind={StorageClassReference} name={obj.metadata.name} namespace={undefined} title={obj.metadata.name} />
    </div>
    <div className="col-sm-4 col-xs-6 co-break-word">
      {obj.provisioner}
    </div>
    <div className="col-sm-2 hidden-xs">
      {obj.reclaimPolicy}
    </div>
    <div className="col-sm-2 hidden-xs">
      { fromNow(obj.metadata.creationTimestamp) }
    </div>
  </div>;
};

const StorageClassDetails: React.SFC<StorageClassDetailsProps> = ({obj}) => <React.Fragment>
  <div className="co-m-pane__body">
    <SectionHeading text="StorageClass Overview" />
    <ResourceSummary resource={obj} showNodeSelector={false} showPodSelector={false} />
  </div>
</React.Fragment>;

export const StorageClassList: React.SFC = props => <List {...props} Header={StorageClassHeader} Row={StorageClassRow} />;
StorageClassList.displayName = 'StorageClassList';

export const StorageClassPage: React.SFC<StorageClassPageProps> = props =>
  <ListPage {...props} title="Storage Classes" kind={StorageClassReference} ListComponent={StorageClassList} canCreate={true} filterLabel={props.filterLabel} />;
StorageClassPage.displayName = 'StorageClassListPage';


const pages = [navFactory.details(detailsPage(StorageClassDetails)), navFactory.editYaml()];

export const StorageClassDetailsPage: React.SFC<StorageClassDetailsPageProps> = props => {
  return <DetailsPage {...props} kind={StorageClassReference} menuActions={menuActions} pages={pages} />;
};
StorageClassDetailsPage.displayName = 'StorageClassDetailsPage';

/* eslint-disable no-undef */
export type StorageClassRowProps = {
  obj: any,
};

export type StorageClassDetailsProps = {
  obj: any,
};

export type StorageClassPageProps = {
  filterLabel: string,
};

export type StorageClassDetailsPageProps = {
  match: any,
};
/* eslint-enable no-undef */
